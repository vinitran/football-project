package config

// DefaultValues is the default configuration
const DefaultValues = `
Environment = "development" # "production" or "development"
[Database]
	User = "postgres"
	Password = "123456"
	Name = "postgres"
	Host = "localhost"
	Port = "5433"
	MaxConns = 200
[Redis]
	Password = ""
	Name = "redis"
	Host = "localhost"
	Port = "6380"
`
