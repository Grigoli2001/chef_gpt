# ChefGPT Frontend

This is the frontend for the ChefGPT application. It is built using React, TypeScript, and Vite. The frontend handles user authentication, chat sessions, and user preferences.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Explanation of Each Folder](#explanation-of-each-folder)
- [Components](#components)
- [Pages](#pages)
- [Context](#context)
- [API](#api)
- [Types](#types)
- [Styles](#styles)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/chef-gpt-frontend.git
   cd chef-gpt-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:

   ```plaintext
   VITE_BACKEND_URL=http://localhost:8080
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Configuration

- `eslint.config.js`: Configuration for ESLint.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `vite.config.ts`: Configuration for Vite.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint.
- `npm run preview`: Preview the production build.

## Folder Structure

```plaintext
front/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public/
├── README.md
├── src/
│   ├── api/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Explanation of Each Folder

- **api**: Contains functions for making API requests.
- **components**: Contains reusable React components.
- **constants**: Contains constant values used throughout the application.
- **context**: Contains React context providers and hooks.
- **hooks**: Contains custom React hooks.
- **pages**: Contains the main pages of the application.
- **styles**: Contains styled components and CSS files.
- **types**: Contains TypeScript type definitions.

## Components

- **Sidebar.tsx**: The sidebar component that displays the navigation menu.
- **StartChat.tsx**: The component for starting a new chat session.
- **SelectLikes.tsx**: The component for selecting user preferences for likes.
- **SelectDislikes.tsx**: The component for selecting user preferences for dislikes.
- **PreferencesForm.tsx**: The form component for setting user preferences.
- **Header.tsx**: The header component displayed at the top of each page.
- **Footer.tsx**: The footer component displayed at the bottom of each page.
- **ChatMessage.tsx**: The component for displaying individual chat messages.
- **UserProfile.tsx**: The component for displaying user profile information.

## Pages

- **LoginPage.tsx**: The login page.
- **RegisterPage.tsx**: The registration page.
- **ChatPage.tsx**: The chat page where users interact with the GPT model.
- **HomePage.tsx**: The home page displaying available chefs.
- **PreferencesPage.tsx**: The page for setting user preferences.

## Context

- **AuthProvider.tsx**: Provides authentication context to the application.
- **SidebarContext.tsx**: Provides sidebar state context to the application.
- **UseAuth.ts**: Custom hook for using the authentication context.
- **UseSidebar.ts**: Custom hook for using the sidebar context.

## API

- **auth.ts**: Contains functions for authentication-related API requests.
- **preferences.ts**: Contains functions for user preferences-related API requests.
- **gpt.ts**: Contains functions for interacting with the GPT model.

## Types

- **auth.types.ts**: Type definitions for authentication-related data.
- **api.types.ts**: Type definitions for API responses and requests.

## Styles

- **preferences.styles.ts**: Styled components for the preferences form.
- **App.css**: Global CSS styles.
- **index.css**: Tailwind CSS styles.

## License

This project is licensed under the MIT License.
