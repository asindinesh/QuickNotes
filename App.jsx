
import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch all notes from Flask
  const fetchNotes = async () => {
    try {
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError("Cannot connect to backend. Please check Flask.");
    } finally {
      setLoading(false);
    }
  };

  // Load notes when the component starts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Save a new note
  const handleSave = async (e) => {
    if (!window.confirm("Are you sure you want to save this note?")) {
  return;
}
    e.preventDefault();

    if (!content.trim()) {
      setError("Please write something before saving.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to save note");
      }

      setContent("");
      await fetchNotes();

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Delete a note
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
  return;
}
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete note");
      }

      setNotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== id)
      );

    } catch (err) {
      setError(err.message || "Unable to delete note.");
    }
  };

  // Format note creation date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="app-container">

      <header className="header">
        <div className="logo">QuickNotes</div>
        <p>Your thoughts, saved in one place.</p>
      </header>

      <main className="main-content">

        <section className="note-editor">
          <h2>Create a Note</h2>

          <form onSubmit={handleSave}>
            <textarea
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
            />

            <div className="editor-footer">
              <span>{content.length} characters</span>

              <button
                type="submit"
                disabled={saving || !content.trim()}
              >
                {saving ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>
        </section>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <section className="notes-section">
          <div className="section-heading">
            <h2>My Notes</h2>
            <span>{notes.length} notes</span>
          </div>

          {loading ? (
            <p className="status-message">Loading notes...</p>
          ) : notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet!</h3>
              <p>Create your first note above.</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <article className="note-card" key={note.id}>
                  <p className="note-content">{note.content}</p>

                  <div className="note-footer">
                    <small>{formatDate(note.created_at)}</small>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(note.id)}
                      aria-label={`Delete note ${note.id}`}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>

      <footer className="footer">
        Built with React, Flask and SQLite
      </footer>

    </div>
  );
}

export default App;

