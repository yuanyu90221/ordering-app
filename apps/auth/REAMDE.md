# auth server

This server provide auth service for all request come in

## environment setup

```.env
JWT_SECRET=
JWT_EXPIRATION=
MONGO_URI=
PORT=3001
RABBIT_MQ_URI=
RABBIT_MQ_AUTH_QUEUE=auth
```

| Environment Variable | Usage |
|----------------------|-------|
| JWT_SECRET | use for jwt sign and verify |
| JWT_EXPIRATION | expires in second for jwt token |
| MONGO_URI | for users service to get data |
| RABBIT_MQ_URI | for service to listen on request from another service |
| RABBIT_MQ_AUTH_QUEUE | for queue for listen on auth |