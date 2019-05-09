### Environment

- node version: 11.2.0

### Install packages

```
$ nvm use 11.2.0
$ yarn install
```

### Check server address in src/contants/api.js file
```
    server: "http://localhost:8000",
    url: "http://localhost:8000/api/v1",
```
### Run

```
$ yarn start
```

### Deployment with Docker
```
$ docker network create --subnet=172.17.0.0/16 headshotnet

$  docker run -d \
	-p 3000:3000 \
	--net headshotnet \
	--ip 172.20.0.3 \
	--name headshot-printing \
	valeriia333/headshot-printing
```
