# order server

order server is for serving order operation

## environment setup

```.env
MONGO_URI=
PORT=3000
RABBIT_MQ_URI=
RABBIT_MQ_BILLING_QUEUE=billing
RABBIT_MQ_AUTH_QUEUE=auth
```

| Environment Variable | Usage |
|----------------------|-------|
| MONGO_URI | for users service to get data |
| PORT | port for serving order service |
| RABBIT_MQ_URI | for service to listen on request from another service |
| RABBIT_MQ_BILLING_QUEUE | for queue for listen on billing |
| RABBIT_MQ_AUTH_QUEUE | for queue for listen on auth |