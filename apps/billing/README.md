# billing server

This billing server is for serving billing logic

## environment setup 

```env
RABBIT_MQ_URI=
RABBIT_MQ_BILLING_QUEUE=billing
RABBIT_MQ_AUTH_QUEUE=auth
```

| Environment Variable | Usage |
|----------------------|-------|
| RABBIT_MQ_URI | for service to listen on request from another service |
| RABBIT_MQ_BILLING_QUEUE | for queue for listen on billing |
| RABBIT_MQ_AUTH_QUEUE | for queue for listen on auth |