# Backend for ChefGPT

This is the backend for the ChefGPT application. It is built using Node.js, Express, and MongoDB. The backend handles user authentication, chat sessions, and user preferences.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [GPT Service](#gpt-service)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/chef-gpt-backend.git
   cd chef-gpt-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=8080
   MONGO_URI=your_mongodb_uri
   JWT_SECRET_KEY=your_jwt_secret_key
   JWT_REFRESH_SECRET_KEY=your_jwt_refresh_secret_key
   SESSION_SECRET=your_session_secret
   ```

4. Start the server using:
   ```sh
   npm start
   ```

## Features

- User Authentication
- Real-time Messaging
- Message Storage
- Chat Initialization
- Chat Response

## Configuration

- `commitlint.config.ts`: Configuration for commit linting.
- `eslint.config.mjs`: Configuration for ESLint.
- `jest.config.ts`: Configuration for Jest testing.
- `tsconfig.json`: TypeScript configuration file.

## Scripts

- `npm run dev`: Start the development server with nodemon.
- `npm run lint`: Run ESLint.
- `npm run lint:fix`: Fix ESLint errors.
- `npm run format`: Format code with Prettier.
- `npm run test`: Run tests with Jest.
- `npm run test:watch`: Run tests in watch mode.
- `npm run test:coverage`: Generate test coverage report.
- `npm run test:verbose`: Run tests with verbose output.

## Folder Structure

```plaintext
back/
├── .env
├── .gitignore
├── .husky/
│   ├── _
│   ├── commit-msg
│   └── pre-commit
├── commitlint.config.ts
├── coverage/
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov-report/
│   └── lcov.info
├── eslint.config.mjs
├── jest.config.ts
├── logs/
│   └── app.log
├── package.json
├── src/
│   ├── boot/
│   ├── constants/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── types/
├── tsconfig.json
└── README.md
```

### Explanation of Each Folder

- **boot**: Contains the setup and initialization code for the application.
- **constants**: Contains constant values used throughout the application.
- **controllers**: Contains the controllers that handle the API requests.
- **middlewares**: Contains custom middleware functions.
- **models**: Contains the Mongoose models for MongoDB.
- **routes**: Contains the route definitions for the API.
- **services**: Contains the business logic and service functions.
- **types**: Contains TypeScript type definitions.

## API Endpoints

### Authentication

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/signin`: Log in a user.
- `GET /api/auth/refresh`: Refresh the access token.
- `GET /api/auth/user`: Get the authenticated user's information.
- `GET /api/auth/signout`: Log out the user.

### User Preferences

- `POST /api/user/userPreferences`: Create user preferences.
- `GET /api/user/userPreferences`: Get user preferences.
- `PUT /api/user/userPreferences`: Update user preferences.
- `DELETE /api/user/userPreferences`: Delete user preferences.

### Chat

- `POST /api/gpt/chat`: Start a new chat session.
- `POST /api/gpt/chatResponse`: Get a response from the chat.
- `GET /api/gpt/chat/history/:chatId`: Get the chat history.
- `GET /api/gpt/chats`: Get all chat sessions for the user.

## GPT Service

The GPT service is a core part of the ChefGPT application. It handles the interaction with the GPT model to generate responses for the chat sessions. The service is responsible for:

- **Model Initialization**: Loading and initializing the GPT model.
- **Chat Session Management**: Creating and managing chat sessions.
- **Generating Responses**: Processing user messages and generating responses using the GPT model.

### Model Initialization

The GPT model is loaded and initialized when the service starts. This ensures that the model is ready to generate responses when needed.

### Chat Session Management

The service creates a new chat session for each user interaction. It stores the session information in the database and manages the session state.

### Generating Responses

When a user sends a message, the service processes the message and generates a response using the GPT model. The response is then sent back to the user and stored in the chat history.

## License

This project is licensed under the MIT License.
