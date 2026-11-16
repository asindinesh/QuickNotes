
import sqlite3
from pathlib import Path

DATABASE = Path(__file__).parent / "notes.db"


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


def get_all_notes():
    connection = get_connection()

    notes = connection.execute(
        "SELECT * FROM notes ORDER BY id DESC"
    ).fetchall()

    connection.close()

    return [dict(note) for note in notes]


def create_note(content, created_at):
    connection = get_connection()

    cursor = connection.execute(
        "INSERT INTO notes (content, created_at) VALUES (?, ?)",
        (content, created_at)
    )

    connection.commit()
    note_id = cursor.lastrowid
    connection.close()

    return note_id


def delete_note(note_id):
    connection = get_connection()

    cursor = connection.execute(
        "DELETE FROM notes WHERE id = ?",
        (note_id,)
    )

    connection.commit()
    deleted = cursor.rowcount > 0
    connection.close()

    return deleted
