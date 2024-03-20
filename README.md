# TaskFlow

TaskFlow is a web application built with Next.js, Tailwind CSS, and TypeScript. It leverages Clerk for authentication.

## Features

-   User authentication with Clerk
-   Task management
-   Task filtering and sorting
-   Responsive design with Tailwind CSS

## Prerequisites

Before running the project, make sure you have the following installed:

-   Node.js (version 18.X.X)
-   npm (version 9.X.X)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/SNKYNinja/Task-Flow.git
    ```

2. Install the dependencies:

    ```bash
    cd taskflow
    npm install
    ```

3. Configure Clerk:

    - Sign up for a Clerk account at [https://clerk.dev](https://clerk.dev)
    - Create a new Clerk application
    - Copy the API Key and Client ID
    - Rename `.env.example` to `.env.local` and update the values with your Clerk API Key and Client ID

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the TaskFlow application.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Credit

This project is part of a tutorial course by [The Code Dealer](https://www.youtube.com/@TheCodeDealer) on [youtube](https://www.youtube.com/watch?v=kPKXmEp_wfU).
