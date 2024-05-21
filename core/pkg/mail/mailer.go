package mail

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
)

const (
	SMTP_SSL = "ssl"
	SMTP_TLS = "tls"
)

type MailDriver string

const (
	MailDriverSMTP     MailDriver = "smtp"
	MailDriverSendgrid MailDriver = "sendgrid"
	MailDriverLog      MailDriver = "log"
)

type Config struct {
	MailDriver MailDriver

	MailAPISendgridKey string

	MailSMTPHost       string
	MailSMTPPort       int
	MailSMTPUsername   string
	MailSMTPPassword   string
	MailSMTPEncryption string
}

type Mail struct {
	From        string       `json:"from"`
	To          []string     `json:"to"`
	Subject     string       `json:"subject"`
	ContentType string       `json:"contentType"`
	Content     string       `json:"content"`
	Attachments []Attachment `json:"attachments,omitempty"`
}

type Attachment struct {
	Content     []byte `json:"content"`
	Type        string `json:"type"`
	Filename    string `json:"filename"`
	Disposition string `json:"disposition"`
	ContentID   string `json:"content_id"`
}

func (a *Attachment) MarshalJSON() ([]byte, error) {
	type Alias Attachment
	return json.Marshal(struct {
		*Alias
		Content string `json:"content"`
	}{
		Alias:   (*Alias)(a),
		Content: base64.StdEncoding.EncodeToString(a.Content),
	})
}

type Mailer interface {
	Send(ctx context.Context, from string, to []string, subject string, content []byte, attachments []Attachment) error
	GetDriver() MailDriver
}

func NewMailer(cfg *Config) (Mailer, error) {
	if cfg.MailDriver == MailDriverSendgrid {
		return NewMailerSendgrid(cfg)
	}

	if cfg.MailDriver == MailDriverSMTP {
		return NewMailerSMTP(cfg)
	}

	if cfg.MailDriver == MailDriverLog {
		return &MailerLog{}, nil
	}

	return nil, errors.New("invalid email driver")
}

func NewMailerSMTP(cfg *Config) (Mailer, error) {
	if cfg.MailSMTPHost == "" || cfg.MailSMTPPort == 0 || cfg.MailSMTPUsername == "" || cfg.MailSMTPPassword == "" {
		return nil, errors.New("invalid endpoint or credential")
	}

	return &MailerSMTP{
		host:       cfg.MailSMTPHost,
		port:       cfg.MailSMTPPort,
		username:   cfg.MailSMTPUsername,
		password:   cfg.MailSMTPPassword,
		encryption: cfg.MailSMTPEncryption,
	}, nil
}

func NewMailerSendgrid(cfg *Config) (Mailer, error) {
	if cfg.MailAPISendgridKey == "" {
		return nil, errors.New("invalid sendgrid key")
	}

	return &MailerSendgrid{
		key: cfg.MailAPISendgridKey,
	}, nil
}
