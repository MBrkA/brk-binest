
## Description

Nest.js project for back-end application.

## Requirements

* NodeJS (LTS is recommended)
* NPM  

## Dependencies

* pg (^8.10.0)
* typeorm (^0.3.12)
* moment (^2.29.4)
* stripe (^11.13.0)
* typeorm-naming-strategies (^4.1.0)
* @nestjs/schedule (^2.2.0)
* @nestjs/typeorm (^9.0.1)
* @nestjs/config (^2.3.1)
* @nestjs/swagger (^6.2.1)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Docker

```bash
# to run docker-compose.yml
$ sudo docker-compose up
```

## Migration

```bash
# change 'migration-file' with preferred migration name
$ npm run build
$ typeorm migration:generate dist/migration/migration-file -o -d dist/ormconfig.js
$ typeorm migration:run -d dist/ormconfig.js
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

