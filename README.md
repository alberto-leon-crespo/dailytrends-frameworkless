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

### Architecture diagram

You can refer to the architecture diagram at that [link](https://flowchart.fun/f#IIBwNglgxghgLhA9gOwAQBkYE8CmAnAKFVQGV8A3fI1AIUUTgGc48YRqBVRnWbxggJLIAZq2Z4ArlDgS8ODNirEAwimEQA5tVXJGiMPNUBbIzGQATfipQt9BvFdQAlHCESMIcRHgg5HAES9HAFFkBAQ-ajIcS2oAClBIWAQUBVw8AEoCf0RTCDRMdNQAWloJRg9kP0YMRA1oeMToeCQCxUzqITh8YRgoSOIABW8mahcYcyVSCmgB1By85AIAXlXVggBvagAiKCwg2BAcEjgsA22ALlRtgAEIIzc8OFRZMDiAHW2ACzg4EEYLgB6QHCGyMAB0GnoGgMbAgEKguUBUAqACYAPy9IwQMBYZYCGgAWQA1IMDAAPYkkMwAgDuGh+NwALAAGFkAbgArGyAGTmeHgbDLRi0tifDLs97IKUAEgARn0ANYaPCICQWK60r6eHCS5AyxFgbxXADEAGYAIyszlyvUy0FhABiMGxuKunwJhNQZJw5NINM+ABpUIwacVuD5hHa5OZTTgAGxmgCcTPjdu8Zg0OFNwiZMFR8YtdtwYCNtJzFt6ZttspVOBwyFNqJgSfMAA4o7K5WAJNnUCb4yz4zhhGnZSBZOA+wPzHmAOxQO11rA51ExGJ6qUxLOoDZS4i0iDmOBfK4WkDkvXEKCySjh04GK5ynAAL18eCvqDgMDwWbgxR-VVaXDL42D7FgIEzAxP0gKpikNY1UG7JVPz0WR+gAvAgPg-REOQqBFU-b9fxwf9AMQYCELwJ8wBQ-dUFo58wCucx4BgOJGJwMAJXo7pyX-BUCJVNULBwo1qNQeUlWE9VzCI30BOk1VZOKRAQD6TwV1QIteIU4pBOVZTRPU8x+WQDQrk5T8HX-LEcS0+0bGdV0sGsmxwwgF8+ytPUAF8pSlC4oG1MBzAMCoAG1GFAo4AHUjxPABdXd6MPY9T1QVjvziaKwPi9KeOQfzpUbYKcTC6oopinAAAkcE0H5kr3NBUC+eqGTgFi2Jy6q6oauBCuKwKytC8LGAivi4EJH96mQABNJrdP44pTF-fJii0rL2Mm6a1vmwaAtKkKKsinaZvyAANRaWsmlbzuQYpyS67Kzr2i6DpKoLjrGlKWs45jMu6-7CuIGzijst1JJs5z7Pk5baVYEBNURuH-1MclijSk8z25T8sYy1E2U-Nr+rPIn6LBjwvLPMcbr08gYEgDRG1QfownwVHilApmWbZ7oP3o2CcC59qfjPcEmVQ6qrjkaQoN1eiDJk0SqKuGVl0-VXJKoz85W8SY8DExCDVwgWWr1vADcxhKCd1-X8HvM4+z0SA5Ip9zaVFzrUG5DkpSG5BAQAKiD0hiOeIPAWG77KvyAB9SY63kAAebTEoitU4ATnAk9QAA+VAWWu4gLat-Grj9lrcqOGWRPMWXv3M6DFaUuujYk9W5AbTXTc1bVuj8w7g9DgAVfBsWQRnUEj6PyrGjOJCzxOu9QVOLXT+Pl-rfPC+LpD7cN8vC6lsDa9khv5d11uVK1mUYx78S+51QeSuH2hWGQMrzOnqOjrn2PkDZ1zgXIuEVN45xXqnVE6dM5AJXgXdev1iDVz7PyF0KA3bm2virXukluy9gfohLUz96Ikw6lcQmlcS4H2tulCunNVqzQ2hQl+Uo36EnwLNDQ08Z5-1GgAuB28EEwMXoI+QICRFLwgdvKB10A5fX-hUcEVE44xiQUhbB5h25q3vvRLWxCB7+1nvwpRKiMzmXkM1EumjtGSXMVmQhEkDEKyKsYk6CJTZxxLGWdRSsjJaNvt4iiL8FEmI8eJOOSc0BWI0UJfxtjO71mQI4p+hjXF8Pccozx+DLEtziW3W+OSUmoGcSEkamSVETjwFOXxNjb5VKnMU0pRiMljSyRE5ctT8k31wYk1yLS3FtJQaongjcYS5KrtLVAF8m4uOKqEzJwz-EzPGeolBZ8LArObukhZQzqpxy4pAf4EzkFTMORAY5ZSY5KOGRBeWaypl3NmVcxREJhlHDCDAKE0T6LrNQB8783yXlhPBMMtq5IvmpBiX88FkLkktN2dUUF+y2ogEBVC35UzUXovhTs8peywJx0QHLb5DzT6oGJTi4Fiz9nMB-GSmuIZiLUoJUcOOCosJcQZX2DlcgwAsqRcMtBRgMHcpYpBEVFgBU3P2ZQE5IYplyulW8-ZeAvi5D1keMV0z1VGE1Zg+Z+LBWqv6sUNVGrEBauhVMnwHUzW6v1cq5FhLAXasBU6pZbctnyr+fE71Hr9k3n-N67VQazWjMvgio1MrCV61+LkM1XqI2zO1XGrwRhE0qX9VG65KrCWIk-jAO8sLSXWvJQW2AxbfRwqdaXfAcdkAoHlXWw+Nt6GKxocwJ2VwXZHlrQfOOvbzC+JoUfVEdtLYOy7Y+EM+g+05teeCFtCcYDRRiCOydra6GoHHR2zdjsZ2sTXQawZSLl3mAYN0YdMSW20OxjuidVtp2oMvRuAZrTKq0j3kfLacRaQfVPZFL4e8yFi0BtlL4AGqjmCzOCIWg653XsFvkYWz6e2IZftuHAcGUMJ1fUhv6KGD0vt+G+9JWGcNVBXce9RQtiNdWPZhmD2HiJ-kwkBOOTzVkxNY6RdjFEQLkq49s4qFHeNkSwhRTjPh5bFG6PK8T-HgJ-OE8LeTTHYOKfIrSOOUAIB4CgAYOTMmU08Zmnx7TgnGV6YM0Z1TGmWPmYkxx1T8FVQVHUVpyTynHkmfGW59wjAHPgi8y5vzRmDI3jwJQTzTmlNWfAuF4WkXbxzK3MxkLcXtNxzlbFkizmBN-KVS0sTWXvOce3mZ-L8WVP1mC6FqTjAACOEgfwKbK9hP5zXWtyHqx1qTNnDPteq5Zv5g2RPpc0-1nTwrRVVbY6NqZs2pUlYyw1nTwUcDkFVD8m602EtXE29tlAfWRvlcbVUPLC3vMHdQBdtL0HYNoQM8LbLqm1lqhezV3zkFnmrae59jCb2ktycq78wHr2bsqZB+p-72HntA-K+NtTSWPvoUh51qZyPjO-fGcFhHGOpOuagO5mo0KIffaEyDkngX8cU+B7jiLSoosxfJ+jynjLXMpeiw9ijBOlM5bB1XenUPFV1bh6CkXLmhfIKl4Vx54vyMZf59l7rbW0dfcW+StXvWJcq6R-pobGvEeY-LYbibj34dy5mxKub4P2da8Zctk9lvJcO6R21Y7u3Zfu9N9Zz3O26e+6k-d43hOfPkvu6wxs6k5BhHUSZMyFltJUP3vutDs7XaPodmO7Phtb46zyYZApvS-F105gzHmVwvAgDcmEcGLp7Jq2ho33EMEYBMWeuxYGxSTbiTr-+Km3kkzgk5BeBh91mElCsu+i4seGxwHad4OOziunF56Y-Ep-cHtz7a2EJfeBIlyCwGv5WATekaxadsQMOxG2TGGB4FIuhLi7moMQbYyBUQv62MQX-1xyQv4WiDgsjghtgshthzhtjJgWhmiExmhtg35-7v5YAv6oiEzghmhzhmichoEWicjxichJgwFv6oC+SIG-4f5Jjf4kHv4AEUJMjwGj6EwWgWgQFgFYH4HkF-7bAoFXDFD4EgHcgFhEGsgQHwFtgkFkEkEf4WhUFXA-5IHbB0ElBQGj5zhoFoFJjxhMiohzj4EWhcEUG8ElCoichmij5JhtiphaFWHxiWFmjxiSGGEyHUFIH-6AGmEj7JhzhJjgHcjYG2GGHIEv78GEHghzh2EWgsicgRFDhMgxFOHSHIAWhf7yE0HuH0GpjgimEshziQGchWiFgwFBHXDGEQHgi+GohMhtjxgRGogOEFFmiJHcHIBtiuGKHKFVFMhMgVFtg4HaEsgOFzhMgWhzglE8GoFgG9GWjJhtijGxHxHNEUHJFtFpFuFKEhGoigFzFgG5FEEQF4EQHjHGH8F9HghsicgCHDFJhJiohEFLHv7JHxjtHcHKFmiYHgijFDi3HaFthJjDHHEv6qExEaF3HaG6H4FMgPHXDJEWgvEUGdHdE9GJjdG3GUKFhDiAl8EwEWifFWiYFmgjGWHDEMHQkyFzjwm0Ev7YG4kxFaFaGDhQGWg1FYklDqHxjZEwE+FJiXFAEOGohknJEsiUkZE7rdEgEwEDHcgphYFYGsnFCElzjZFMgpiwFzEshVH1GCkUlrEdGoEME9EalwFAHDE1FmjykRGch4nRFMgRGWjxhwGClmgikbFkxDjnEFE-GmFRFsGsmaHWnqGXEDHqEWiClMgunKEwEsgj6+EEH1EQGci2nmnpETEULoGphmH1GsFWExGkl-5SEtGcgRmAFJiWjnGYFEEEE4EOEOHymJlKnRFQGEwxGEFzisGCnPG6mvH6llndHYExFmgsgMH4GcjyksG1EVGDFgHVmYESH5nOHJHhldkInUmJkSyFgqnDFshwFMjykOEgFoHSl-FQEpgEFziCmEzFkVysksiSHUC+QEAPlrCrBAA) or, alternatively, it can be found in the root of the project in the 'docs' folder.

It's interactive!

## Package.json - Scripts

The `scripts` section of the `package.json` file defines a series of shell commands associated with this project. Here is a description of each command:

## Available Scripts

This project includes several scripts for different purposes:

- `"test"`: This script sets the environment to `test` and runs all tests in the project using Jest. The `--detectOpenHandles` and `--forceExit` options help ensure all tests are correctly finalized, and there are no pending asynchronous operations when the tests finish.
- `"test:interactive"`: This script runs Jest in watch mode, which allows for interactive testing. Tests related to changed files will automatically run, providing instant feedback during development.
- `"develop"`: This script starts the server in development mode using `ts-node-dev`, which restarts the server on file changes.
- `"console:dev"` and `"console:prod"`: These scripts run the console in development and production environments, respectively. `CONSOLE_ENV=true` signifies that the console is active.
- `"build:app"`: This script transpiles the TypeScript code to JavaScript using the TypeScript Compiler (`tsc`).
- `"remove:dist"`: This script removes the `./dist` directory, which contains the compiled JavaScript files from a previous build.
- `"copy:config"`: This script copies all `.yml` configuration files from the `src` directory to the `dist/src` directory after the TypeScript code has been transpiled to JavaScript.
- `"build"`: This script removes the previous build in the `./dist` directory, runs all tests, builds the application, copies the configuration files to the `dist/src` directory, and then builds the Docker image.
- `"start"`: This script starts the server in the production environment.
- `"release"`: This script automates version management and package release using the `standard-version` package.
- `"docker:build"`: This script builds the Docker image for the project with the tag `dailynews`.
- `"generate:swagger"`: This script generates the Swagger (OpenAPI) specification document using `tsoa`.

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

```bash
npm ci
```

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

```bash
npm run build
```

This command will clean the dist folder, build the application, and copy the configuration files to the dist folder.

To run the built version of the application, run:

```bash
npm run start
```

## Running the Docker Container

The Docker image for this project is automatically built when the `npm run build` command is run.

To run the Docker container, you need to have a `.env` file that contains your environment variable settings. In particular, the Docker container needs to be able to connect to a MongoDB instance that matches the information in your `.env` file.

You can run the Docker container using the following command:

```bash
docker run -p 3000:3000 --env-file .env dailynews
```

> **Note**: Please ensure that your .env file contains valid settings for your MongoDB instance (for example, MONGODB_URI and MONGODB_DATABASE), as well as any other environment variables your application requires.

## Running Tests

In order to run the tests correctly, the SSL library version 1.1 is required. If you're unable to install it via your Linux distribution's standard package manager, please visit the following URL: https://pkgs.org/download/libssl1.1.

Here, you'll find the binary file that corresponds to your specific Linux distribution. Download and install the appropriate binary to ensure your tests run correctly.

## API Documentation Generation

Due to various factors affecting the design of the project, we are using `tsoa` exclusively for the decoration of controllers and the generation of API documentation. `tsoa` cannot be used for any additional functionality within this project.

To generate the API documentation, follow these steps:

1. Decorate the necessary controllers with the `tsoa` decorators. This will allow `tsoa` to introspect these files for generating OpenAPI documentation.

2. Run `npm run generate:swagger`. This will trigger `tsoa` to generate an OpenAPI (Swagger) JSON file based on the decorators added in the previous step.

3. After executing the command, discard the changes made to the controllers in step 1. This is necessary because we are using `tsoa` exclusively for the decoration of controllers and generation of the documentation.

Once you've followed these steps, start your project server. The API documentation will then be accessible at [http://127.0.0.1:3000/api-docs](http://127.0.0.1:3000/api-docs). This provides a user-friendly interface to interact with your API and observe the endpoints, request types, and responses.

Please remember, these steps are necessary each time you make changes to your API and wish to update the generated documentation.

> As we migrate to a system where `tsoa` will also generate routes, this process will be updated accordingly.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE.md) file for details.
