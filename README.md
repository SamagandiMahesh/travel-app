# Travel App

This project is a flight search application built with React and Next.js. It allows users to search for flights based on departure location, arrival location, and departure date. The search results are paginated and can be navigated using a custom pagination component.

## Project Structure

The project is organized into the following main directories:

- `components`: This directory contains all the React components used in the application. They are further organized into `atoms`, `molecules`, and `organisms` based on atomic design principles.
- `hooks`: This directory contains custom React hooks used for fetching data.
- `styles`: This directory contains styled-components used for styling the React components.
- `types`: This directory contains TypeScript type definitions.

## Components

Here are some of the main components in the application:

- `SearchForm`: A form for searching flights. It includes fields for departure location, arrival location, and departure date.
- `SearchResults`: A component that fetches and displays a list of itineraries based on the search form inputs. It supports pagination and displays 5 itineraries per page.
- `ODDatePicker`: A custom date picker component that uses the `DatePicker` component from `react-datepicker`.
- `ODSelect`: A custom select component that uses the `Select` component from `react-select`.
- `Header`: A header component with a link to the home page.
- `Footer`: A footer component with a customizable label.

## Setup and Installation

1. Clone the repository:
2. Navigate into the project directory: `cd repository`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`

## Scripts

- `npm run dev`: Runs the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the linter.
- `npm run tsc`: Runs the TypeScript compiler without emitting output.
- `npm run test`: Runs the tests with coverage.
- `npm run storybook`: Starts the Storybook server.
- `npm run build-storybook`: Builds the Storybook for static deployment.

## Technologies Used

This project uses a number of technologies and libraries:

- [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) for building the user interface.
- [Styled Components](https://styled-components.com/) for styling the components.
- [React Hook Form](https://react-hook-form.com/) for managing form state.
- [React Select](https://react-select.com/home) and [React Datepicker](https://reactdatepicker.com/) for custom form controls.
- [Bootstrap](https://getbootstrap.com/) for additional styling.
- [Moment.js](https://momentjs.com/) for date manipulation.
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing.
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formatting and linting.
- [TypeScript](https://www.typescriptlang.org/) for static typing.
- [MSW](https://mswjs.io/) for mocking server handlers during development and testing.

## Checks

This project uses a number of checks to ensure code quality:

- **Linting**: Linting is the process of running a program that will analyze code for potential errors. You can run the linter using the `npm run lint` command.
- **Type Checking**: Type checking is the process of verifying and enforcing the constraints of types. You can run the TypeScript compiler for type checking using the `npm run tsc` command.
- **Testing**: Testing involves running a suite of tests to ensure the functionality of your application. You can run the tests using the `npm run test` command.
- **Formatting**: Formatting is the process of making the code consistent and readable. This is handled automatically by Prettier and ESLint.
- **Build**: The build process involves compiling the source code into a deployable artifact. You can build the application using the `npm run build` command.

These checks are often run in a continuous integration (CI) environment whenever code is pushed to the repository. This helps catch any issues early before they are merged into the main codebase.
