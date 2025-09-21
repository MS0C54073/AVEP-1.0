# AVEP - Asset Verification Platform

AVEP (Asset Verification Platform) is a modern, secure, and reliable web application designed to simplify the process of financial and physical asset verification for individuals and organizations. It provides a centralized dashboard to manage, track, and verify a wide range of assets, from linked financial accounts to manually submitted physical items like vehicles and real estate. The platform leverages AI to provide insightful financial summaries based on the provided data.

## Features

- **User Authentication**: Secure login and registration for both individuals and organizations.
- **Unified Dashboard**: A central hub to view an overview of all financial and manually submitted assets, recent transactions, and linked accounts.
- **Manual Asset Management**: Full CRUD (Create, Read, Update, Delete) functionality for a variety of asset categories:
    - Vehicles
    - Electronics
    - Real Estate
    - Jewelry
    - Non-Bank Investments
    - Custom Assets
- **Police Clearance Integration**: All manual asset submissions include fields for police clearance details, including the station and a document upload.
- **AI-Powered Financial Summary**: Utilizes Generative AI (via Genkit) to analyze financial data and produce a concise, easy-to-understand summary of financial health.
- **Client Management**: A dedicated section for organizations to manage their clients and view their details.
- **Global Search**: Quickly find any asset or client across the platform using a `Cmd/Ctrl + K` interface.
- **Secure & Compliant**: Built with security in mind, ensuring user data is handled safely. Utilizes `.gitignore` to prevent sensitive information like API keys from being exposed.

## Technology Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) or another package manager like yarn or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/avep.git
    cd avep
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add the necessary environment variables. For the AI features to work, you will need a Google AI API key.

    ```
    # .env
    GEMINI_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```
    You can obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

1.  **Start the development server:**
    This command starts the Next.js application in development mode.
    ```bash
    npm run dev
    ```

2.  **Start the Genkit development server (in a separate terminal):**
    This command starts the Genkit server, which is required for the AI features to work locally.
    ```bash
    npm run genkit:dev
    ```

3.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

## Project Structure

The project follows a standard Next.js App Router structure:

-   `src/app/`: Contains all the routes and pages of the application.
    -   `src/app/(auth)/`: Routes related to authentication (login, register).
    -   `src/app/dashboard/`: Protected routes for the main user dashboard and its sub-pages.
-   `src/components/`: Contains all shared React components, organized by feature (e.g., `dashboard`) and UI primitives (`ui`).
-   `src/ai/`: Contains all Genkit-related code, including flows and prompts for generative AI features.
-   `src/lib/`: Contains utility functions, data sources (`data.ts`), and other shared logic.
-   `public/`: Static assets that are publicly accessible.
-   `.env`: Environment variables file (ignored by Git).
-   `next.config.ts`: Configuration for the Next.js application.
-   `tailwind.config.ts`: Configuration for Tailwind CSS.
