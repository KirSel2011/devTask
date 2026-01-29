import { useState, useEffect } from "react";
import classes from "./TaskNote.module.css"
import { fetchNotesByTask, createNote, updateNote, deleteNote } from "../services/noteServices.js"
export default function PersonalTaskNote({ taskId , token}) {
  const [notes, setNotes] = useState([]);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    async function loadNotes() {
      try {
        const data = await fetchNotesByTask(taskId);
        setNotes(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadNotes();
  }, [taskId]);

  const handleAddNote = async () => {
    try {
      const note = await createNote(taskId, newContent);
      setNotes((prev) => [...prev, note]);
      console.log("Add Note function is executed now! ");
      setNewContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateNote = async (id, content) => {
    try {
      const updated = await updateNote(id, content);
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? updated : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      console.log("targeted delete note id passed noteService: ", id)
      const data= await deleteNote(id);
      console.log("Message returned from backend in TaskNotePage: ", data.message);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      console.log("It is succesfully deleted a note!");
    } catch (err) {
      console.error(err);
    }
  };
  console.log("array of notes in taskNote component: ", notes);
  return (
  <div className={classes.mainNote}>
    <h3 className={classes.title}>Notes</h3>

    <ul className={classes.noteList}>
      {notes.map((note) => (
        <li key={note._id} className={classes.noteItem}>
         {/*  <input
            className={classes.noteInput}
            type="text"
            value={note.content}
            onChange={(e) => handleUpdateNote(note._id, e.target.value)}
          /> */}
          <input
            type="text"
            
            value={note.content}
            onChange={(e) =>
              setNotes(prev =>
                prev.map(n =>
                  n._id === note._id ? { ...n, content: e.target.value } : n
                )
              )
            }
            onBlur={() => handleUpdateNote(note._id, note.content)}
          />

          <button
            className={classes.deleteBtn}
            onClick={() => handleDeleteNote(note._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>

    <div className={classes.addNote}>
      <input
        className={classes.addInput}
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Add a note..."
      />
      <button className={classes.addBtn} onClick={handleAddNote}>
        Add Note
      </button>
    </div>
  </div>
);

}
