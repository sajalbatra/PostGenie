# PostGenie

## Overview

This project is a web application that allows users to generate social media posts using Google's **Gemini API** and save them to a Google Spreadsheet using the Google Sheets API. The application also provides functionality to fetch and display posts from the spreadsheet.

### Key Features:
- **Generate Social Media Posts**: Users can input a prompt to generate social media posts using the Gemini API.
- **Save Posts to Google Spreadsheet**: Generated posts are saved to a Google Spreadsheet with columns for timestamp, prompt, and post text.
- **Display Posts**: Users can view all posts or filter to see only their own posts.
- **Error Handling**: Includes error handling and user feedback for API requests.

### Bonus Task:
- **Retrieve and Display Posts**: The application retrieves and displays posts from the Google Spreadsheet on the UI.

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sajalbatra/PostGenie
   cd postgenie
   ```

2. **Install Dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Run:
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your environment variables based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your **Gemini API key** and Google Sheets API credentials.

4. **Deployment:**
   Deploy the application to a hosting provider of your choice (e.g., Vercel, Netlify). Follow the provider’s instructions for deploying a Next.js application.

5. **Run Locally:**
   Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to see the application.

## Folder Structure

```
└── 📁postgenie
    └── .env
    └── .env.example
    └── .env.local
    └── .eslintrc.json
    └── .gitignore
    └── 📁app
        └── 📁api
            └── 📁auth
                └── 📁[...nextauth]
                    └── route.ts
            └── 📁fetchPosts
                └── route.ts
            └── 📁savePosts
                └── route.ts
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── page.tsx
        └── SessionProvider.tsx
    └── 📁components
        └── 📁Header
            └── Header.tsx
        └── 📁Home
            └── Home.tsx
        └── 📁ui
            └── alert-dialog.tsx
            └── button.tsx
            └── input.tsx
            └── label.tsx
            └── radio-group.tsx
    └── components.json
    └── 📁lib
        └── utils.ts
    └── next-env.d.ts
    └── next.config.mjs
    └── package-lock.json
    └── package.json
    └── postcss.config.mjs
    └── 📁public
        └── next.svg
        └── vercel.svg
    └── README.md
    └── 📁recoil
        └── generatedpostatom.tsx
        └── promptatom.tsx
        └── savedpostsatom.tsx
    └── tailwind.config.ts
    └── tsconfig.json
```

- **`app/`**: Contains the core application files.
  - **`api/`**: Contains API route handlers for authentication and data operations.
  - **`favicon.ico`, `globals.css`, `layout.tsx`, `page.tsx`, `SessionProvider.tsx`**: Core application files for layout and global styles.
  
- **`components/`**: Contains reusable UI components.
  - **`Header/`**: Header component.
  - **`Home/`**: Home page component.
  - **`ui/`**: UI components like alert dialogs, buttons, inputs, etc.

- **`lib/`**: Contains utility functions.

- **`public/`**: Static assets like SVGs.

- **`recoil/`**: Contains Recoil state management atoms.

- **`next.config.mjs`**: Configuration file for Next.js.

- **`tailwind.config.ts`**: Configuration file for Tailwind CSS.

- **`tsconfig.json`**: TypeScript configuration.

## Deployment

- **Deployed Application URL**: https://post-genie.vercel.app/

## Google Spreadsheet

- **Google Spreadsheet URL**: [[Sheet Database](https://docs.google.com/spreadsheets/d/1PiSb93E5Rdnd30mvgrlHR5FwnL2U3jfhsX15kIFybBA/edit?gid=0#gid=0)]
  - **Access**: View and Edit access for everyone.

## Error Handling and User Feedback

- Error messages are displayed in the UI if there is an issue with generating or saving posts.
- The application provides feedback for successful and failed operations.
