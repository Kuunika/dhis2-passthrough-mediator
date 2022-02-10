# DHIS2 Pass Through Mediator

![GitHub release (latest by date)](https://img.shields.io/github/v/release/Kuunika/dhis2-passthrough-mediator?style=for-the-badge) [![GitHub issues](https://img.shields.io/github/issues/Kuunika/dhis2-passthrough-mediator?style=for-the-badge)](https://github.com/Kuunika/dhis2-passthrough-mediator/issues) [![GitHub license](https://img.shields.io/github/license/Kuunika/dhis2-passthrough-mediator?style=for-the-badge)](https://github.com/Kuunika/dhis2-passthrough-mediator/blob/main/LICENSE)

## Introduction
- This is a Pass through mediator for communicating of a DHIS2 instance through the The OpenHIM Interoperability layer
- for more information about mediators please visit //Link to mediator design page[]
- This mediator is utilise the OpenHIM framework to register the 

## Assumption
- This mediator is intend to run using docker as such it is user the host mane of "" when registering the mediator channel. This is due to the information mediatorConfig.json file


## Requirements
Docker: Version

Docker Compose: Version

## Installation
//split these up into sections
- create a new .env file with the values found in the .sample.env

| Variable Name    | Example Value | Description |
|------------------|---------------|-------------|
| MEDIATOR_PORT    |               |             |
| OPENHIM_USERNAME |               |             |
| OPENHIM_PASSWORD |               |             |
| OPENHIM_API_URL  |               |             |


- run the following docker command

```bash
docker build -t dhis2-pass-through-mediator .
```

next we will create an container from the image and run the container with it liked to the same network as our OpenHIM instance. Please note the name of the network in this example can be different in your enviroment.

```bash
docker run --env-file .env --network openhim --name dhis2-pass-through-mediator -p 3000:3000 --rm dhis2-pass-through-mediator
```

Will then navigate to the OpenHIM Console and go to the mediatiors section to register the mediator
/// add a gif to show the steps.


Inorder 

if all is set up correctly when hitting the base route of '' it will return the following response:


## Trouble Shooting