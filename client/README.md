# Base Development Envrionment with React

## Frontend Only

Light weight dev environment. `create-react-app` covers way more scenarios; however, it takes time to install all of the dependencies. This is just for a quick install and run and is easily configurable with webpack and babel.

`npm i`<br />
`npm start`<br />
Go to `localhost:3000`

add packages with `npm i <packages>` or remove them with `npm uninstall <packages>`.<br/>
(e.g. `react-router-dom` is installed, remove it with `npm uninstall react-router-dom` and the environment is one package lighter)

### Using Docker

If use `docker-compose up` and later need to add package, you will have to use `docker-compose run client npm i <package>`; otherwise, you will get permission errors.

## Tests

Testing is configured with jest and enzyme.
