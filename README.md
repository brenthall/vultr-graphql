# Vultr GraphQL Microservice

GraphQL wrapper to the RESTful [Vultr API](https://www.vultr.com/api/).

## Installation

```bash
git clone https://github.com/brenthall/vultr-graphql.git
cd vultr-graphql
npm install
```

## Usage

Start the server with `npm run start` then navigate to `http://localhost:4001/playground` to use GraphQL Playground.

### Public Usage

```graphql
# List all server locations
query AllRegionsQuery {
  regions {
    DCID
    name
    country
    #continent
    #state
    ddos_protection
    block_storage
    regioncode
  }
}
```

### Authenticated Usage

Create an `.env` file containing your [Vultr `API-Key`](https://my.vultr.com/settings/#settingsapi).

```bash
echo VULTR_KEY = XYZABC >> .env
```

```graphql
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

## TODO

- Docker
- Baremetal actions
- Naming

## License

[ISC](http://opensource.org/licenses/ISC)

Copyright (c) 2018, Brent Hall
