
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timezone

from database import (
    initialize_database,
    get_all_notes,
    create_note,
    delete_note
)

app = Flask(__name__)
CORS(app)

# Initialize database when the application starts
initialize_database()


# GET: Retrieve all notes
@app.route("/api/notes", methods=["GET"])
def get_notes():
    notes = get_all_notes()
    return jsonify(notes), 200


# POST: Create a new note
@app.route("/api/notes", methods=["POST"])
def add_note():
    data = request.get_json(silent=True)

    if not data or not isinstance(data, dict):
        return jsonify({"error": "Invalid request body"}), 400

    content = data.get("content")

    if not isinstance(content, str) or not content.strip():
        return jsonify({"error": "Note content is required"}), 400

    created_at = datetime.now(timezone.utc).isoformat()

    note_id = create_note(content.strip(), created_at)

    return jsonify({
        "id": note_id,
        "content": content.strip(),
        "created_at": created_at,
        "message": "Note saved successfully"
    }), 201


# DELETE: Delete a note
@app.route("/api/notes/<int:note_id>", methods=["DELETE"])
def remove_note(note_id):
    deleted = delete_note(note_id)

    if not deleted:
        return jsonify({"error": "Note not found"}), 404

    return jsonify({
        "message": "Note deleted successfully"
    }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
