# Vultr GraphQL Microservice

GraphQL wrapper to the RESTful [Vultr API](https://www.vultr.com/api/).

## Installation

```bash
git clone https://github.com/brenthall/vultr-graphql.git
cd vultr-graphql
npm install
```

## Usage

Start the server with `npm run start` then navigate to [`localhost:4001/playground`](http://localhost:4001/playground).

![localhost_4001_playground](https://user-images.githubusercontent.com/306464/47887096-c4e89080-de91-11e8-860b-edb94a591c52.png)

### Public Usage

```graphql
"""
List data centre locations
"""
query AllRegionsQuery {
  regions {
    DCID
    name
    country
    continent
    state
    ddos_protection
    block_storage
    regioncode
  }
}
```

```json
{
  "data": {
    "regions": [
      {
        "DCID": "1",
        "name": "New Jersey",
        "country": "US",
        "continent": "North America",
        "state": "NJ",
        "ddos_protection": true,
        "block_storage": true,
        "regioncode": "EWR"
      },
      {
        "DCID": "2",
        "name": "Chicago",
        "country": "US",
        "continent": "North America",
        "state": "IL",
        "ddos_protection": true,
        "block_storage": false,
        "regioncode": "ORD"
      },
      {...}
    ]
  }
}
```

### Authenticated Usage

Create an `.env` file containing your [Vultr `API-Key`](https://my.vultr.com/settings/#settingsapi).

```bash
echo VULTR_KEY = XYZABC >> .env
```

#### List servers

```graphql
"""
List servers with region, plan and os subqueries
"""
query AllServersQuery {
  server {
    ram
    disk
    main_ip
    vcpu_count
    region {
      DCID
      name
      country
    }
    plan {
      price_per_month
      vcpu_count
      bandwidth
    }
    os {
      name
      family
    }
  }
}
```

```json
{
  "data": {
    "server": [
      {
        "ram": "1024 MB",
        "disk": "Virtual 25 GB",
        "main_ip": "144.202.11.100",
        "vcpu_count": 1,
        "region": {
          "DCID": "1",
          "name": "New Jersey",
          "country": "US"
        },
        "plan": {
          "price_per_month": 5,
          "vcpu_count": 1,
          "bandwidth": 1
        },
        "os": {
          "name": "Ubuntu 18.10 x64",
          "family": "ubuntu"
        }
      },
      {...}
    ]
  }
}
```

#### Create server

```graphql
"""
Create server
Region: New Jersey
Plan: 1 vCore, 1024 MB
OS: Ubuntu 18.10 x64
"""
mutation createServer {
  createServer(
    input: { DCID: 1, VPSPLANID: 201, OSID: 302, label: "new server" }
  ) {
    SUBID
  }
}
```

```json
{
  "data": {
    "createServer": {
      "SUBID": "19880001"
    }
  }
}
```

#### Bandwidth used

```graphql
"""
Get the bandwidth used by a virtual machine
"""
query bandwidth {
  bandwidthServer(SUBID: ${SUBID}) {
    date
    incoming
    outgoing
  }
}
```

```json
// Note: Vultr response has been transformed to group by date
{
  "data": {
    "bandwidthServer": [
      {
        "date": "2018-10-03",
        "incoming": 26180296,
        "outgoing": 89481034
      },
      {
        "date": "2018-10-04",
        "incoming": 29129423,
        "outgoing": 161776257
      },
      {...}
    ]
  }
}
```

## TODO

- Docker
- Baremetal actions
- Naming

## License

[ISC](http://opensource.org/licenses/ISC)

Copyright (c) 2018, Brent Hall
