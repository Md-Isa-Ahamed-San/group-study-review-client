# Group Study Review

Group Study Review is a web application designed to facilitate online group study and collaboration among students. It provides a platform for creating classes, managing tasks, submitting assignments, and reviewing peers' work.

## Key Features

*   **User Authentication:** Secure registration and login for students and instructors.
*   **Class Management:** Create, join, and manage virtual classes.
*   **Task Assignment:** Instructors can create and assign tasks or assignments to students within a class.
*   **File Submissions:** Students can submit their work (supports various file types, including PDFs).
*   **Peer Review:** (Future Feature - Implied by name) Functionality for students to review each other's submissions.
*   **Dashboard:** A personalized dashboard for users to view their classes, upcoming tasks, and recent activity.
*   **User Profiles:** Manage user profile information.

## Tech Stack

**Frontend:**

*   React
*   React Router for navigation
*   Tailwind CSS for styling
*   Vite for frontend tooling
*   DaisyUI (Tailwind CSS component library)
*   Material UI (React UI components)
*   React Query for server state management
*   React Context for global state management
*   Axios for HTTP requests
*   Framer Motion for animations
*   Lucide React Icons & Font Awesome for icons
*   React PDF Viewer for displaying PDFs
*   React Hook Form for form handling
*   React Hot Toast & SweetAlert2 for notifications

**Backend:**

*   Firebase (Authentication, Firestore Database, Storage)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm (comes with Node.js) or yarn

### Environment Variables

This project uses Firebase for its backend services. You will need to set up a Firebase project and obtain your Firebase configuration credentials.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project (or use an existing one).
3.  In your project settings, find your Firebase SDK setup snippet. It will look something like this:

    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

4.  Create a `.env` file in the root of the project.
5.  Add the following environment variables to your `.env` file, replacing the placeholder values with your actual Firebase config values:

    ```env
    VITE_API_KEY="YOUR_API_KEY"
    VITE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    VITE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    VITE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    VITE_APP_ID="YOUR_APP_ID"
    ```
    *Note: Vite requires environment variables exposed to the client-side to be prefixed with `VITE_`.*

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/group-study-review-client.git
    cd group-study-review-client
    ```
2.  Install the dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

1.  Start the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## Project Structure

Here's a brief overview of the key directories:

*   `public/`: Contains static assets like `index.html` and icons.
*   `src/`: Contains the main source code for the application.
    *   `api/`: Code related to API calls (e.g., using Axios).
    *   `components/`: Reusable React components.
    *   `contexts/`: React context providers for global state.
    *   `firebase/`: Firebase configuration and utility functions.
    *   `forms/`: Components related to forms (login, registration).
    *   `hooks/`: Custom React hooks.
    *   `pages/`: Top-level page components.
    *   `providers/`: Higher-order components providing context or other functionalities.
    *   `routes/`: Routing configuration.
    *   `shared/`: Shared components or utilities used across the application.
    *   `App.jsx`: The main application component that sets up routing.
    *   `main.jsx`: The entry point of the React application.
*   `.env`: Environment variable configuration (ensure this is in `.gitignore`).
*   `package.json`: Lists project dependencies and scripts.
*   `vite.config.js`: Configuration for Vite.
*   `tailwind.config.js`: Configuration for Tailwind CSS.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to fix a bug, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeatureName`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeatureName`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (if one is created).
```
