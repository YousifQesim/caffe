# Caffe Management System

A comprehensive web application for managing Caffe operations, including user authentication, category and item management, order handling, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Integration](#api-integration)
- [Validation](#validation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication**: Secure login using username and password with client-side validation.
- **Category Management**: CRUD operations for Caffe categories with form validation.
- **Item Management**: Add, edit, and delete items within categories with detailed validation for item attributes.
- **Order Management**: View orders placed by customers in real-time.
- **Responsive Design**: Optimized for various screen sizes to ensure usability on desktop and mobile devices.
- **API Integration**: Communicates with a backend server for data retrieval and storage.
- **SWR Integration**: Uses SWR for efficient data fetching and caching.
- **State Management**: Uses React Context API for managing global state related to orders, categories, and items.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend Integration**: RESTful APIs with fetch API, SWR for data fetching
- **Form Validation**: Yup for client-side form validation with detailed error messages.
- **State Management**: React Context API for managing global state related to orders, categories, and items.
- **API Communication**: Custom `api` utility for making HTTP requests to the server with centralized base URL configuration.
- **SWR**: Used for efficient data fetching, caching, and synchronization with server data.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your/repository.git
   cd repository-name

2. **Clone the repository:**
    ```bash
    npm install

3. **Set up environment variables:**
  - Create .env file in the root of your project.
  - Define the environment variable for API URL:

   ```bash
     VITE_DEVELOPMENT_API=http://localhost:3000/api

3. **Run Application:**
  ```bash
  - npm start
  





## API Integration

The frontend communicates with the backend server using RESTful APIs. The `api` utility (`getServer.ts`) manages HTTP requests and includes the base URL configured via environment variables.

## Validation

Form validation is handled using Yup schemas (`loginValidationSchema`, `categorySchema`, `itemSchema`) defined in the `validation` folder. These schemas enforce data integrity rules and provide detailed error messages for form inputs.

## Contributing

Contributions are welcome! Here's how you can contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
