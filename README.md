## Requirements

- go version: 1.22
- docker compose version: 2.23

## Setup

Run all service
```
make run
```

Stop all service
```
make stop
```

Run migrate 
```
make run-migrate-up // for up
make run-migrate-down //dor down
```

Run the api
```
cd backend
go run cmd/*.go api           //--cfg flag for path of configuration file
```

Run the migration
```
cd backend
go run cmd/*.go migration --action up   // action up to update database
go run cmd/*.go migration --action down // action down to revert database
```

Generate bob
```
cd backend
go run github.com/stephenafamo/bob/gen/bobgen-psql@latest -c ./config/bobgen.yaml
```

Clean and lint code command
```
gofumpt -l -w .
golangci-lint run ./...
```