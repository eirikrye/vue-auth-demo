# vue-auth-demo

Example Vue application with simple Python backend server to demonstrate building Vue applications using an HTTP API as a backend.

`npm run serve` will automatically proxy API requests to the python server running at `localhost:8181` (see below).

## node

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## python

### Install

```
pip3 install -r server/requirements.txt
```

### Run

```
cd server
waitress-serve --listen=127.0.0.1:8181 api:app
```