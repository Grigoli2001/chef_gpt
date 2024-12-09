# Chef GPT

Chef GPT is a React-based web application that serves as your personal culinary assistant. It allows users to engage in interactive conversations with AI-powered chefs, providing recipe suggestions, cooking tips, and more.

## Features

- **Interactive Chat Interface**: Engage in real-time conversations with AI chefs to receive personalized culinary advice.
- **Multiple Chef Personalities**: Choose from various chef personas, each offering unique cooking styles and expertise.
- **Recipe Recommendations**: Get tailored recipe suggestions based on your preferences and available ingredients.
- **Cooking Tips and Tricks**: Access a wealth of cooking knowledge, including techniques, substitutions, and more.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **State Management**: React Query
- **Authentication**: Custom authentication context
- **Real-time Communication**: WebSockets for live chat updates

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Grigoli2001/chef_gpt.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd chef_gpt
   ```

3. **Install Dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

5. **Start the Development Server**:

   Using npm:

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

## Project Structure

```
chef_gpt/
├── public/                 # Public assets
├── src/
│   ├── api/                # API service functions
│   ├── components/         # Reusable UI components
│   ├── context/            # Context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point
│   └── ...                 # Other configuration files
├── .env.example            # Example environment variables
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
└── ...                     # Other configuration and metadata files
```

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
