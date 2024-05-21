package mail

import (
	"context"
	"errors"
	"net/http"
	_mail "net/mail"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

type MailerSendgrid struct {
	key string
}

func (m *MailerSendgrid) Send(ctx context.Context, from string, to []string, subject string, content []byte, attachments []Attachment) error {
	return m.SendWithClient(ctx, sendgrid.NewSendClient(m.key), from, to, subject, content, attachments)
}

func (m *MailerSendgrid) SendWithClient(ctx context.Context, client *sendgrid.Client, from string, to []string, subject string, content []byte, attachments []Attachment) error {
	e, err := _mail.ParseAddress(from)
	if err != nil {
		return err
	}

	sender := mail.NewEmail(e.Name, e.Address)
	recipients := make([]*mail.Email, len(to))
	for i, v := range to {
		recipients[i] = mail.NewEmail("", v)
	}

	msg := new(mail.SGMailV3)
	msg.SetFrom(sender)
	msg.Subject = subject
	p := mail.NewPersonalization()
	p.AddTos(recipients...)
	msg.AddPersonalizations(p)
	msg.AddContent(mail.NewContent("text/html", string(content)))
	response, err := client.Send(msg)
	if err != nil {
		return err
	}

	if response.StatusCode < http.StatusOK || response.StatusCode >= http.StatusBadRequest {
		return errors.New(response.Body)
	}

	return nil
}

func (m *MailerSendgrid) GetDriver() MailDriver {
	return MailDriverSendgrid
}
