# Home Library Service

##<code style="color: orange">Attention</code>

For route ``auth/refresh`` <code style="color: orange">REFRESH</code> token should be added in HTTP Authorization header and body ``{ refreshToken }``
[proof](https://discord.com/channels/755676888680366081/755859645184213073/1077808263824949340)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```
```
git checkout feature/add-auth
```

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
- Run tests using docker:
  ```
  npm run test:docker
  ```
[Link to DockerHub](https://hub.docker.com/repository/docker/mashuxa/nodejs2022q4-service/tags)



## Installing NPM modules

```
npm install
```

## You can rename .env.example to .env, and set custom value for PORT (4000 by default)

## Running application

```
npm start
```

## Running local tests

```
npm start test:auth
```

## Or try with flag --runInBand

```
npm run test:auth -- --runInBand
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test:auth
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
