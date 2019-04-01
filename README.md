# vue-auth-demo

Example Vue application with simple Python backend server to demonstrate building Vue applications using an HTTP API as a backend.

`npm run serve` will automatically proxy API requests to the python server running at `localhost:8181` (see below).

## Node

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

## Python

### Install

```
cd server
pip3 install -r requirements.txt
```

### Run

```
waitress-serve --listen=localhost:8181 api:app
```

or, using gunicorn:

```
gunicorn -b localhost:8181 api:app --reload
```
