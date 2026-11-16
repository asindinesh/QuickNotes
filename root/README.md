# QuickNotes – Full Stack Note-Taking Application

QuickNotes is a full-stack web application that allows users to create, view, and delete notes. It is built using React.js, Python Flask, and SQLite.

## Features

- Create and save notes
- View all saved notes
- Delete notes with confirmation
- Persistent storage using SQLite
- Character validation
- Responsive user interface
- REST API integration
- Error handling

## Tech Stack

**Frontend**
- React.js
- Vite
- HTML
- CSS
- JavaScript

**Backend**
- Python
- Flask
- Flask-CORS

**Database**
- SQLite

## Project Structure

```text
QuickNotes/
├── backend/
│   ├── app.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/asindinesh/QuickNotes.git
cd QuickNotes
```

### 2. Start the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

Windows PowerShell:
```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start Flask:

```bash
python app.py
```

Backend runs at `http://127.0.0.1:5000`.

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Retrieve all notes |
| POST | `/api/notes` | Create a note |
| DELETE | `/api/notes/<id>` | Delete a note |

## Database

SQLite stores notes persistently, including their content and creation timestamps.

## Future Improvements

- Edit existing notes
- Search and filter notes
- User authentication
- Cloud deployment

## Author

**Asin Dinesh**

GitHub: https://github.com/asindinesh

## License

This project is available for educational and learning purposes.
