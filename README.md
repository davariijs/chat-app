# 💬 Real-time Chat Application

A modern, responsive, and real-time chat application built with Next.js, TypeScript, and Socket.io. This project serves as a technical assessment to demonstrate proficiency in modern frontend technologies and best practices.


---

### ✨ Features

- **Real-time Messaging**: Instant message delivery using `Socket.io`.
- **Persistent Chat History**: Messages are saved to `localStorage` for a seamless user experience across sessions.
- **Dynamic UI Updates**: The user list updates in real-time to show the latest message and sender.
- **Responsive Design**: A beautiful and functional UI across all devices, from small mobile screens to large desktops.
- **Dark/Light Mode**: A theme toggle for user preference.
- **Component-Based Architecture**: Well-structured and maintainable code with a clear separation of concerns.
- **Modern Tooling**: Built with the latest versions of Next.js and TypeScript.
- **Unit Tested**: Core logic is covered by unit tests using Jest to ensure reliability.

---

### 🛠️ Tech Stack

- **Framework**: ▲ `Next.js` 15
- **Language**: `TypeScript`
- **Styling**: `Tailwind CSS` 4 with `Shadcn/ui` for component primitives.
- **Real-time Communication**: `Socket.io`
- **State Management**: `Zustand`
- **Forms**: `React Hook Form` & `Zod` (used in ChatInput)
- **Testing**: `Jest` & `ts-jest`


---

### ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

- Node.js (v18 or later)
- npm or yarn

#### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/davariijs/chat-app.git
    cd chat-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Run the Socket.io server:**
    This server handles the real-time message broadcasting. Open a new terminal window and run:
    ```bash
    npm run dev:socket
    ```
    You should see the message: `🚀 Socket.IO server is running on port 3001`

4.  **Run the Next.js development server:**
    In your original terminal window, run:
    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The app will automatically redirect you to the first user's chat.

---

### 🧪 Running Tests

This project uses Jest for unit testing the core logic.

-   **Run tests once:**
    ```bash
    npm test
    ```

-   **Run tests in watch mode:**
    This is great for development as it automatically re-runs tests on file changes.
    ```bash
    npm run test:watch
    ```

-   **Generate a test coverage report:**
    ```bash
    npm run test:coverage
    ```

---