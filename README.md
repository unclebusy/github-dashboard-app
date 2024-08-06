# GitHub Dashboard App

[![Описание изображения](https://i.ibb.co/vzvZCqQ/Git-Hub-Dashboaed-App.jpg)](https://ibb.co/KyzFchL)

## Description

A React application that integrates with the GitHub API to provide OAuth authentication. Once authenticated, users can view and edit their profile information, browse their repositories, and search for other GitHub users and their repositories.

## Technologies

### Frontend

- React
- Redux Toolkit
- React Router
- Axios
- Material-UI

### Backend

- Node.js
- Express

## Installation

### Clone the Repository

1. Clone the repository:
    ```bash
    git clone https://github.com/unclebusy/github-dashboard-app
    ```
2. Navigate to the project directory:
    ```bash
    cd github-dashboard-app
    ```

### Install Dependencies

#### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

#### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

#### Frontend

1. Create a `.env` file in the `frontend` directory, then contact me and I will send you the information you need to add to that file.
    ```plaintext
    REACT_APP_CLIENT_ID=enter Clien ID 
    REACT_APP_REDIRECT_URI=http://localhost:3000/oauth/callback
    ```

#### Backend

1. Create a `.env` file in the `backend` directory, then contact me and I will send you the information you need to add to that file.
    ```plaintext
    REACT_APP_CLIENT_ID=enter Clien ID 
    REACT_APP_CLIENT_SECRET=enter Clien Secret
    PORT=4000
    ```

### Running the Project

#### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Start the development server:
    ```bash
    npm start
    ```

#### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Start the server:
    ```bash
    npm run server
    ```

### Project Structure

```plaintext
.github-dashboard--app/
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── README.md
│   └── package.json
└── README.md
