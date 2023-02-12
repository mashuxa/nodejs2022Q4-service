# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Change branch to feature/add-docker

## Docker

- Run docker on your PC
- Go to root directory of application
- Rename .env.example => .env and set variables
- Run for vulnerabilities scanning:
  ```
  npm run scan:docker
  ```
- Run application using docker:
  ```
  npm run start:docker
  ```
[Link to DockerHub](https://hub.docker.com/repository/docker/mashuxa/nodejs2022q4-service)



## Installing NPM modules

```
npm install
```

## You can rename .env.example to .env, and set custom value for PORT (4000 by default)

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
