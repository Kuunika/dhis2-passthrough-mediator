# DHIS2 Passthrough Mediatior



## Background

This Nest.JS based application provides a tunnel to a DHIS2 instance. The main purpose of this application is to monitor the traffic and the data that is being sent to DHIS2. This application is intended to be exposed over the Interopablity Layer.



## Installation

### Local Installation

Create a .env file and fill in the displayed values, 

```bash
TIMEOUT=10000
MAX_REDIRECTS=5
PORT=3434
#URl to DHIS2 Instance
BASE_URL=
#Account Credential for DHIS2 User
USERNAME=
PASSWORD=
API_GLOBAL_BASE_URL=/dhis2core/api/v0/
```



```bash
npm install
```



### Docker Installation 