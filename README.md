# GrantScout: AI-Powered Grant Discovery Platform

GrantScout is a visually stunning, minimalist web application designed to help users effortlessly discover and track funding opportunities. Built on Cloudflare's edge network, it offers a lightning-fast, intuitive interface for searching, filtering, and saving grants. The application features a clean, card-based layout for grant listings, a powerful search with multiple filter criteria (category, funding amount, deadline), and a client-side 'saved grants' functionality for easy tracking. The design prioritizes clarity, readability, and a delightful user experience with subtle micro-interactions and animations, making the often tedious process of finding grants simple and elegant.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ArkMaster123/grantscoutdemo)

## ✨ Key Features

-   **Intuitive Grant Discovery:** A clean, minimalist interface for searching and browsing grants.
-   **Advanced Filtering:** Refine search results by category, funding amount, and application deadline.
-   **Save for Later:** Bookmark interesting grants for future reference using client-side local storage.
-   **Responsive Design:** Flawless experience across all devices, from mobile phones to desktops.
-   **High-Performance:** Built on Cloudflare's edge network for a lightning-fast user experience.
-   **Visually Stunning UI:** A modern, beautiful design with smooth animations and micro-interactions.

## 🛠️ Technology Stack

-   **Frontend:**
    -   [React](https://react.dev/)
    -   [Vite](https://vitejs.dev/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [shadcn/ui](https://ui.shadcn.com/)
    -   [Zustand](https://zustand-demo.pmnd.rs/) for state management
    -   [Framer Motion](https://www.framer.com/motion/) for animations
-   **Backend:**
    -   [Hono](https://hono.dev/) running on Cloudflare Workers
-   **Storage:**
    -   [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
-   **Language:**
    -   [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) as the package manager and runtime
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for Cloudflare Workers development

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/grantscout.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd grantscout
    ```
3.  **Install dependencies using Bun:**
    ```sh
    bun install
    ```
4.  **Run the development server:**
    The development server starts both the Vite frontend and the Hono backend on Cloudflare Workers.
    ```sh
    bun dev
    ```
    The application will be available at `http://localhost:3000`.

## 📁 Project Structure

-   `src/`: Contains the frontend React application code.
    -   `pages/`: Main application views/pages.
    -   `components/`: Reusable UI components.
    -   `hooks/`: Custom React hooks, including the Zustand store.
    -   `lib/`: Utility functions and API client.
-   `worker/`: Contains the backend Hono application for Cloudflare Workers.
    -   `user-routes.ts`: API route definitions.
    -   `entities.ts`: Durable Object entity definitions.
-   `shared/`: Contains code shared between the frontend and backend, such as type definitions and mock data.

## ☁️ Deployment

This project is designed for seamless deployment to the Cloudflare network.

1.  **Login to Wrangler:**
    Ensure you are logged into your Cloudflare account via the Wrangler CLI.
    ```sh
    bunx wrangler login
    ```
2.  **Build the project:**
    This command bundles both the frontend and backend for production.
    ```sh
    bun run build
    ```
3.  **Deploy to Cloudflare:**
    This command deploys your application to your Cloudflare account.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy your own version of GrantScout with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ArkMaster123/grantscoutdemo)

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the application, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.