package mail_test

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"core/pkg/mail"

	"github.com/sendgrid/sendgrid-go"
	"github.com/stretchr/testify/assert"
)

var srv *httptest.Server

func TestMailerSendgridSend(t *testing.T) {
	key := "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"
	clientMock := sendgrid.NewSendClient(key)
	clientMock.BaseURL = srv.URL
	mailer := mail.MailerSendgrid{}

	err := mailer.SendWithClient(context.Background(), clientMock, "vinitran124@gmail.com", []string{"20020503@vnu.edu.vn"}, "subject", []byte("foobar"), nil)
	assert.NoError(t, err)
}

func TestMailerSendgridSendFailure(t *testing.T) {
	clientMock := sendgrid.NewSendClient("API_KEY_INVALID")
	clientMock.BaseURL = srv.URL
	mailer := mail.MailerSendgrid{}

	err := mailer.SendWithClient(context.Background(), clientMock, "foo@example.com", []string{"bar@example.com"}, "subject", []byte("foobar"), nil)
	assert.Error(t, err)
}

func setup() {
	srv = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("authorization")
		if auth != "Bearer API_KEY" {
			w.WriteHeader(http.StatusForbidden)
			fmt.Fprintln(w, `{"errors":[{"message":"The provided authorization grant is invalid, expired, or revoked","field":null,"help":null}]}`)
			return
		}
	}))
}

func shutdown() {
	srv.Close()
}

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	shutdown()
	os.Exit(code)
}
