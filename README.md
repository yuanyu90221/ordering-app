# nestjs with RabbitMQ as communication message broker

## use monorepo structure

1. orders - for order logic
2. billing - for billing logic
3. auth - for auth logic
4. libs/common - for common library
  
## Setup 

```shell=
nest new ordering-app
cd ordering-app
nest g app orders
nest g app billing
nest g app auth
nest g library common
```

adjust nest-cli.json

setup orders as the main app

remove ordering-app setup in nest-cli.json

## How to Run

for specific app , e.g. billing

```shell=
yarn run start:dev billing
```

