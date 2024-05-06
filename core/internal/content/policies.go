package content

import (
	"github.com/ory/ladon"
)

var DefaultPolicies = []ladon.Policy{}

type ContainsSubjectCondition struct{}

// Fulfills returns true if the request's subject is equal to the given value string
func (c *ContainsSubjectCondition) Fulfills(value interface{}, r *ladon.Request) bool {
	s, ok := value.([]string)
	if !ok {
		return false
	}

	for _, v := range s {
		if v == r.Subject {
			return true
		}
	}

	return false
}

// GetName returns the condition's name.
func (c *ContainsSubjectCondition) GetName() string {
	return "ContainsSubjectCondition"
}
