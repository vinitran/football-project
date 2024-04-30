package content

type MatchStatus string

// Enum values for MatchStatus
const (
	MatchStatusPending  MatchStatus = "pending"
	MatchStatusFinished MatchStatus = "finished"
	MatchStatusDelay    MatchStatus = "delay"
	MatchStatusCanceled MatchStatus = "canceled"
	MatchStatusLive     MatchStatus = "live"
)

func (e MatchStatus) Valid() bool {
	return e == MatchStatusPending || e == MatchStatusFinished || e == MatchStatusDelay || e == MatchStatusCanceled || e == MatchStatusLive
}
