package mail

import (
	"context"
	"log"
)

type MailerLog struct{}

func (m *MailerLog) Send(ctx context.Context, from string, to []string, subject string, content []byte, attachments []Attachment) error {
	log.Println(from, to, subject)
	return nil
}

func (m *MailerLog) GetDriver() MailDriver {
	return MailDriverLog
}
