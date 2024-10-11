
# Firebase Auth & Real-Time Database Web App

This project is a **React TypeScript-based web application** that handles user authentication with **email and password**, stores data in **Firebase Real-Time Database**, and is secured using **JWT tokens** and **HTTP-only cookies**. The server is hosted on **Render** and leverages **web static workers**.

## Project Overview

- **Built on React with TypeScript**, but also utilizes **JSX** for rendering components.
- The application supports **email/password authentication**.
- Data is stored and managed in **Firebase Real-Time Database**.
- **User images** are saved as **binary data** in the database, which can result in occasional delays when fetching.
- The project does not use a dedicated file-uploading system.
- It is designed as a **server-side application**, hosted on **Render** for additional security.

## Key Features

- **JWT token-based security** with **HTTP-only cookies** for enhanced protection.
- **Firebase Real-Time Database** as the primary storage solution.
- **React TypeScript template**, with **80%** of the project written in **JavaScript**.
- **Tailwind CSS** and **DaisyUI** for responsive and modern UI design.

## Installation

### Local Development

1. **Clone the repository** and navigate to the project directory.
2. **Install necessary packages** by running the following command in both main directories:
   ```bash
   npm install
