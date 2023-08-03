# DailyTrends Frameworkless

DailyTrends Frameworkless is a web application designed to work without the need for a specific web application framework. It provides flexibility in the development process.

## Development Philosophies

This project is built around a number of key architectural and design philosophies aimed at creating maintainable and scalable software. Here is a brief overview of each philosophy:

### CQRS (Command Query Responsibility Segregation)

CQRS is used to segregate the operations of reading and writing into different models. This facilitates their integration into event-driven architectures. Furthermore, it also enables the reuse of use cases across the application.

### DDD (Domain Driven Design)

The system logic is centered around business logic, following the principles of Domain Driven Design. This allows the complexity of the system to be managed effectively and enables teams to focus on the core business complexities.

### Hexagonal Architecture

Hexagonal architecture, also known as ports and adapters architecture, is used to drive the design of the software. This architecture encourages the separation of concerns, making the system adaptable to change, easy to maintain, and helping with the communication between different components of the system. By structuring the application around distinct ports and adapters, it enables components to remain loosely coupled and highly modular.

### Onion Design

The project follows Onion Design, separating the different parts of the software into application, domain, and infrastructure. Each component has been designed to be as atomic and decoupled as possible. This principle is followed to ensure that each module contains only what is necessary for its operation as much as possible, fostering a high level of maintainability and adaptability.

## Package.json - Scripts

The `scripts` section of the `package.json` file defines a series of shell commands associated with this project. Here is a description of each command:

test: This script runs the project's unit tests in the test environment. It utilizes the Jest module to run the tests and the --detectOpenHandles and --forceExit flags to control Jest's behavior regarding asynchronous operations and test run termination.

- `test:interactive`: This script runs the project's tests in an interactive mode. Jest will stay open after running tests and will watch for changes in test files, re-running relevant tests when changes are detected. This is ideal for use during development.
- `test`: Executes the project's unit tests. In this case, no tests are defined, so it returns an error.
- `develop`: Runs the project in the development environment.
- `console:dev` and `console:prod`: These allow you to run console commands in the development and production environment, respectively.
- `build:app`: Compiles the project for the production environment.
- `remove:dist`: Deletes the `dist` folder.
- `copy:config`: Copies the configuration files into the `dist` folder.
- `build`: Deletes the `dist` folder, compiles the project, run test and copies the configuration files.
- `start`: Runs the project in the production environment.

Author of the project: **Alberto León Crespo**

## Getting Started

To start with the project, clone the repository:

```bash
git clone https://github.com/alberto-leon-crespo/dailytrends-frameworkless.git
```

Then, switch to the `master` branch:

```bash
git checkout master
```

## Installation

To install all the dependencies of the project, run:

npm ci

## Docker Configuration

We're using Docker for MongoDB database and Mongo Express for database management and visualization. To configure and run the Docker containers, we use `docker-compose`. Run the following command to configure and run the containers:

```bash
docker-compose up -d
```

The docker-compose configuration uses a .env file for environment variables. Create a .env file in the root of your project and configure your environment variables. Here's a sample configuration:

```
APP_PORT=3000

DATABASE_MONGO_USER=example
DATABASE_MONGO_PASSWORD=example
DATABASE_MONGO_NAME=dailytrends
DATABASE_MONGO_URL=mongodb://${DATABASE_MONGO_USER}:${DATABASE_MONGO_PASSWORD}@127.0.0.1:27017/dailytrends?authSource=admin

PUPPETER_HEADLESS=true
```

Please set `PUPPETER_HEADLESS` to `true` when deploying on servers, as there may not be a screen available for Puppeteer to launch a browser in non-headless mode.

## Seeding and Reading Feeds

Once your Docker containers are up and running, you can populate your database with initial data and read feeds. Run the following commands:

```bash
npm run console:dev -- feeds seed
npm run console:dev -- feeds read
```

## Running the Application

To run the application, run:

```
npm run develop
```

## Database Access

You can access and manage the database using Mongo Express. It can be accessed at: `http://127.0.0.1:8081`

Mongo Express provides a web interface for viewing and editing data in MongoDB.

## Building

To build the application, run:

```npm run build```

This command will clean the dist folder, build the application, and copy the configuration files to the dist folder.

To run the built version of the application, run:

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
