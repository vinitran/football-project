package mail

import (
	"context"
	"time"

	mail "github.com/xhit/go-simple-mail/v2"
)

type MailerSMTP struct {
	host       string
	port       int
	username   string
	password   string
	encryption string
}

func (m *MailerSMTP) Send(ctx context.Context, from string, to []string, subject string, content []byte, attachments []Attachment) (err error) {
	client := mail.NewSMTPClient()

	client.Host = m.host
	client.Port = m.port
	client.Username = m.username
	client.Password = m.password
	client.ConnectTimeout = 10 * time.Second
	client.SendTimeout = 10 * time.Second

	if m.isTLSEncrypted() {
		client.Encryption = mail.EncryptionSTARTTLS
	} else if m.isSSLEncrypted() {
		client.Encryption = mail.EncryptionSSLTLS
	}

	conn, err := client.Connect()
	if err != nil {
		return err
	}

	email := mail.NewMSG()
	email.SetFrom(from).
		AddTo(to...).
		SetSubject(subject)

	email.SetBodyData(mail.TextHTML, content)

	for _, attachment := range attachments {
		email.AddInlineData(attachment.Content, attachment.Filename, attachment.Type)
	}

	err = email.Send(conn)
	return err
}

func (m *MailerSMTP) isSSLEncrypted() bool {
	return m.encryption == SMTP_SSL
}

func (m *MailerSMTP) isTLSEncrypted() bool {
	return m.encryption == SMTP_TLS
}

func (m *MailerSMTP) GetDriver() MailDriver {
	return MailDriverSMTP
}
