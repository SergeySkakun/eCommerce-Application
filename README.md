# eCommerce-Application

## Description

The final project of the JavaScript/Front-end 2024Q4 course from RSSchool.
This platform replicates real-world shopping experiences in a digital environment. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence.

## Purposes

1. To gain experience in conditions as close as possible to real product development.
2. To learn to resolve controversial issues within the team.
3. To create a full-fledged finished product for use.

## Setup and Running Locally

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

Clone the project to your local machine using Git:

`git clone https://github.com/SergeySkakun/eCommerce-Application.git`

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies using npm:

```
cd eCommerce-Application
npm instal
```

### 3. Run the Development Server

Start the development server:

`npm run dev`

This will start the project on localhost:5173 for development.

### 4. Run the Development Server

Start the development server:

`npm run dev`

This will output the bundled files in the dist directory.

### 5. Run Tests

To run the unit tests:

`npm run test`

## Available Scripts

| Script            | Usage                  | Explanation                                                                                                                                                        |
| :---------------- | :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **dev**           | `npm run dev`          | Starts the development server on [localhost:5173](http://localhost:5173). HMR (Hot Module Replacement) is enabled.                                                 |
| **build**         | `npm run build`        | Builds the production version of the app. First compiles TypeScript files (`tsc -b`), then bundles the project using Vite. Output is located in the `dist` folder. |
| **lint**          | `npm run lint`         | Runs [ESLint](https://eslint.org/) on the project files to detect code quality issues.                                                                             |
| **preview**       | `npm run preview`      | Serves the production build locally to verify the output before deploying.                                                                                         |
| **format**        | `npm run format`       | Formats all files in the `src/` folder using [Prettier](https://prettier.io/), applying the project’s formatting rules.                                            |
| **format\:check** | `npm run format:check` | Checks if the code is properly formatted without making any changes. Useful for CI/CD pipelines.                                                                   |
| **stylelint**     | `npm run stylelint`    | Runs [Stylelint](https://stylelint.io/) on `.css` and `.scss` files to automatically fix style issues.                                                             |
| **prepare**       | `npm run prepare`      | Initializes Git hooks using [Husky](https://typicode.github.io/husky/). This script runs automatically after installing dependencies.                              |
| **test**          | `npm run test`         | Executes tests using [Jest](https://jestjs.io/). Looks for test files inside the `src/` folder with `.test.tsx`/`.test.ts` extensions.                             |

## Technology Stack

|   Technology    |                                                   Version                                                   |
| :-------------: | :---------------------------------------------------------------------------------------------------------: |
|    **React**    |           ![React](https://img.shields.io/badge/React-^19.0.0-61DAFB?logo=react&logoColor=white)            |
| **TypeScript**  |    ![TypeScript](https://img.shields.io/badge/TypeScript-~5.7.2-3178C6?logo=typescript&logoColor=white)     |
|    **SCSS**     |                ![SCSS](https://img.shields.io/badge/SCSS--CD6799?logo=sass&logoColor=white)                 |
|    **Jest**     |             ![Jest](https://img.shields.io/badge/Jest-^29.7.0-C21325?logo=jest&logoColor=white)             |
|    **Vite**     |             ![Vite](https://img.shields.io/badge/Vite-^6.3.1-646CFF?logo=vite&logoColor=white)              |
|   **ESLint**    |          ![ESLint](https://img.shields.io/badge/ESLint-^9.26.0-4B32C3?logo=eslint&logoColor=white)          |
|  **Prettier**   |       ![Prettier](https://img.shields.io/badge/Prettier-^3.5.3-F7B93E?logo=prettier&logoColor=white)        |
| **Commitlint**  |    ![Commitlint](https://img.shields.io/badge/Commitlint-^19.8.0-3F51B5?logo=commitlint&logoColor=white)    |
| **Lint-staged** | ![Lint-staged](https://img.shields.io/badge/Lint--staged-^15.5.1-DB7093?logo=githubactions&logoColor=white) |
|    **Husky**    |            ![Husky](https://img.shields.io/badge/Husky-^9.1.7-5D3A00?logo=husky&logoColor=white)            |
|   **Node.js**   |        ![Node.js](https://img.shields.io/badge/Node.js-v22.15.0-339933?logo=node.js&logoColor=white)        |
|   **GitHub**    |        ![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white)         |

## Authors

- [dmitrystarchenko](https://github.com/dmitrystarchenko)
- [bubnov-roma](https://github.com/bubnov-roma)
- [sergeyskakun](https://github.com/sergeyskakun)
