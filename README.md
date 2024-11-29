# Surfe's Note Taking App

This is a simple and interactive note-taking application built with **React**. The app allows users to create and edit notes, as well as tag other users in their notes using a **mention feature**. The mention feature enables real-time tagging of users by typing `@username`, and the app will highlight the mentioned text.

## Features:
- Create and view notes.
- Edit notes.
- Mention other users by typing `@username` in the note body.
- Real-time highlighting of mentioned users.

---

## How to Run the Application

Follow these steps to set up and run the application locally.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 12 or above)
- [npm](https://www.npmjs.com/) (Node package manager, comes with Node.js)
- A code editor like [VSCode](https://code.visualstudio.com/).

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/your-username/note-taking-app.git
cd note-taking-app
````

### 2. Add environment variables (optional)

In order to set up your session you can setup two environment variables:

```directoy
src/.env

REACT_APP_API_URL=https://challenge.surfe.com
REACT_APP_SESSION_KEY=surfe-session-token
````

If none are set, the `.env.local` file will added them for you.

### 3. Run the project

Simply add in your console:

```bash
npm run install
npm run start
````

## App Structure

The directory structure looks like this:

```code
note-taking-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── STextarea/
│   │   │   └── STextarea.tsx
│   │   │   
│   │   ├── STextSegment.tsx
│   │   ├── SNote.tsx
│   │   └── ...
│   ├── composables/
│   ├── helpers/
│   ├── icons/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├
│   ├── index.tsx
│   └── index.css
├── package.json
├── README.md
└── ...
```

### Key files

- **STextare.tsx**: Responsable to render the text area and manage `Segments` the term for each text fragment that the user adds.

- **STextSegment.tsx**: The Segment itself. It can either be **text** or **a mention**

- **useKeyboard.ts**: A generic composable to handle keyboard events (really important when the user wants to flawlessly move from `Segments` to `Segments`)

- **store/index.ts**: Main file to manage state - it will trigger store mutations and fetch information for the user

## Contributors

**Rafael Neves** - Senior Frontend Developer @Unbabel

