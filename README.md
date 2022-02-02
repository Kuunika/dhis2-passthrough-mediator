# DHIS2 Pass Through Mediator

## Running Mediator

### Docker Run
```bash
    docker run --env-file .env --restart unless-stopped --network your-openhim-network --name name-for-mediator-image -p 3000:3000
```