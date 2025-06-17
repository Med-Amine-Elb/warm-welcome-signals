# BMW Store Frontend

## Project Overview

This repository hosts the React frontend application for a modern BMW Store. It provides a sleek, responsive user interface for browsing a collection of luxury vehicles, viewing detailed specifications, requesting test drives, and inquiring about specific cars. The frontend is designed with a "UJET-inspired" aesthetic, featuring a clean black and white color scheme, glass card effects, and smooth animations, providing an engaging user experience.

This application is designed to integrate seamlessly with a Spring Boot backend API, which manages vehicle data and handles form submissions.

## Features

-   **Vehicle Catalog**: Browse a comprehensive list of BMW vehicles with essential information.
-   **Detailed Vehicle Pages**: View in-depth details for each vehicle, including:
    -   High-resolution image galleries with navigation.
    -   Key specifications (engine, power, transmission, seats).
    -   Performance metrics (acceleration, top speed, torque).
    -   Detailed descriptions and equipment lists.
    -   Quick information (year, mileage, doors).
-   **Interactive Forms**:
    -   "Demander un essai" (Request a Test Drive) form with full-screen animated overlay.
    -   "Demander des informations" (Request Information) form with full-screen animated overlay.
    -   Direct WhatsApp contact option.
-   **Suggested Vehicles**: Automatically displays similar vehicles based on brand or category on the detail page, enhancing discoverability.
-   **Responsive Design**: Optimized for seamless viewing and interaction across various devices (desktop, tablet, mobile).
-   **Smooth Animations**: Incorporates `framer-motion` and custom CSS for elegant scroll-triggered animations and UI transitions.
-   **Consistent UI/UX**: Adheres to a unified design language with a focus on minimalist aesthetics, primarily using black, white, and subtle gray tones.

## Technologies Used

*   **Frontend**:
    *   React
    *   TypeScript
    *   Tailwind CSS (for styling and utility classes)
    *   Framer Motion (for animations)
    *   React Router DOM (for navigation)
    *   Shadcn/ui (for UI components)
*   **Backend**:
    *   Spring Boot (This frontend is designed to interact with a Spring Boot REST API for vehicle data management and form handling. The backend repository is separate.)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Med-Amine-Elb/warm-welcome-signals.git
    cd warm-welcome-signals
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables** (if applicable):
    Create a `.env` file in the root directory of the project and add any necessary environment variables, such as API endpoints. (e.g., `VITE_API_BASE_URL=http://localhost:8080/api/v1`)

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
.
├── public/                     # Static assets (images, favicon)
├── src/
│   ├── assets/                 # Images, icons, etc.
│   │   ├── ui/                 # Shadcn/ui components
│   ├── components/             # Reusable React components (e.g., Navbar, Footer, CarCard)
│   │   ├── hooks/                  # Custom React hooks (e.g., use-toast)
│   ├── lib/                    # Utility functions, helpers
│   ├── pages/                  # Main application pages (e.g., Index, Vehicles, VehicleDetail, Contact)
│   ├── services/               # API service integrations (e.g., vehicleService)
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Entry point for React app
├── index.css                   # Global CSS styles (TailwindCSS imports)
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite build tool configuration
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or want to contribute to the codebase, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact:

[Your Name/Organization Name] - [Your Contact Email/LinkedIn Profile]
