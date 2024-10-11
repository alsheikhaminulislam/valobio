
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
   ```
3. Start the local servers by running
   ```bash
   npm run start
   ```

Both applications will automatically launch.


## Important Notes
- The entire project is server-side hosted on Render.
- The Firebase Real-Time Database stores everything, including user images as binary data.
- The application is designed as a web static worker, which means it can stop occasionally. This is something to consider during live testing.

  
## Links
- Render Server Site: Link to Render server
- Main Website: Link to main site
- Application Source for Both Sites: Link to source code

## Testing the Live Server

For anyone interested in testing the live server, please follow these steps:

1. **Load the following link** first:
   - [Live Server](https://valobioserver.onrender.com/)
   
2. After loading the above link, proceed to the second link:
   - [Main Website](https://alsheikhaminulislam.github.io/valobio/)
## Deployment on Render
**If testing on Render (live server) for the first time, note that the server may take up to 2-5 minutes to start**. Please allow for this initialization time.



## Installation and Local Setup

1. **Clone both repositories**:
   - Client-side: [GitHub - valobio](https://github.com/alsheikhaminulislam/valobio/)
   - Server-side: [GitHub - valobioserver](https://github.com/alsheikhaminulislam/valobioserver/)
   

This sequence will ensure proper functionality and enable you to experience the application as intended. 








# Demo  
![Demo Image](assets/s1.png)
![Demo Image](assets/s2.png)
![Demo Image](assets/s3.png)