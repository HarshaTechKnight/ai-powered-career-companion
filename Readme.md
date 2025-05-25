# KarmaMatch - Career Companion

KarmaMatch - Career Companion is a full-stack AI-powered application designed to assist job seekers throughout their journey. It provides valuable tools for resume analysis, job matching, and interview coaching, leveraging the power of Next.js, Firebase, and GenKit.

## Features

*   **Resume Analyzer:** Get detailed feedback and suggestions to improve your resume.
*   **Job Matcher:** Find relevant job openings based on your resume and preferences.
*   **Interview Coach:** Practice your interview skills with AI-powered mock interviews and receive feedback.

## Technologies Used

*   **Frontend:**
    *   Next.js (React Framework)
    *   Tailwind CSS (Styling)
*   **Backend:**
    *   Firebase (Authentication, Database, Storage, etc.)
    *   GenKit (AI Integration)

## Getting Started

### Prerequisites

*   Node.js installed
*   Firebase project set up
*   GenKit configured

### Installation

1. Clone the repository:
```
bash
    git clone <repository_url>
    
```
2.  Navigate to the project directory:
```
bash
    cd career-companion
    
```
3.  Install dependencies:
```
bash
    npm install
    
```
4.  Configure Firebase:

    *   Create a `.env.local` file in the root directory.
    *   Add your Firebase configuration details:
```
        NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
        
```
5.  Configure GenKit:

    *   Follow the GenKit documentation to set up your AI models and workflows.

### Running the Application

1.  Start the development server:
```
bash
    npm run dev
    
```
2.  Open your browser and visit `http://localhost:3000`.

## Project Structure
```
career-companion/
├── .firebase/
├── .github/
├── .idx/
├── .vscode/
├── docs/
├── patches/
├── public/
├── src/
│   ├── ai/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── .eslintrc.json
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── apphosting.yaml
├── components.json
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```
## Contributing

Contributions are welcome! Please see the CONTRIBUTING.md for details.

## License

This project is licensed under the MIT License.