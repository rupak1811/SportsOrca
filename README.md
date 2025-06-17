# Sports Match Scheduler

A simple web application to display sports match information.

## Setup and Running

This project consists of a backend server (Node.js) and a frontend application (React).

### Prerequisites

- Node.js and npm installed on your system.

### Backend Setup

1.  Navigate to the `backend` directory in your terminal:
    ```bash
    cd backend
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  Start the backend server:
    ```bash
    node server.js
    ```
    The backend server will run on port 5000 by default.

### Frontend Setup

1.  Navigate to the `frontend` directory in your terminal (in a new terminal window or tab):
    ```bash
    cd frontend
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm start
    ```
    The frontend application will open in your default browser, typically at http://localhost:3000.

## API Information

This application fetches sports match data using 'https://www.thesportsdb.com/api/v1/json' from [https://www.thesportsdb.com].

TheSportsDB is an open, crowd-sourced sports database providing data and artwork for various sports and leagues. The free API allows access to endpoints for searching, looking up details, and getting schedules.

Currently, the backend (`backend/server.js`) is configured to fetch **upcoming matches** for the **English Premier League (League ID 4328)** using the `/eventsnextleague.php` endpoint.

**Note on Free API Limitations:** With the free API key (`123`), it is generally **not possible** to fetch upcoming matches for all leagues simultaneously due to API limitations and rate limits. The current setup provides upcoming matches for one specific league. 
