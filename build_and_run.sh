#!/bin/sh
docker build -t dhis-2-passthrough-mediator .
docker run --name passthrough-mediator --env-file .env -p 3434:3434 --network openhimv7_openhim dhis-2-passthrough-mediator