import { useEffect, useState } from "react";
import classes from "./TaskComment.module.css";

const BASE = "http://localhost:3000/api/comments";

export default function TaskComments({ taskId, token }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`${BASE}/${taskId}/comments`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setComments(data);
    }
    load();
  }, [taskId, token]);

  
  async function handleAdd() {
    if (!content.trim()) return;

    const res = await fetch(`${BASE}/${taskId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    const newComment = await res.json();
    setComments(prev => [...prev, newComment]);
    setContent("");
  }

  async function handleDelete(id) {
    await fetch(`${BASE}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    setComments(prev => prev.filter(c => c._id !== id));
  }

  return (
    <div className={classes.commentSection}>
      <h3>Progress & Feedback</h3>

      {comments.map(c => (
        <div key={c._id} className={classes.comment}>
          <strong>{c.author?.name}</strong>
          <p>{c.content}</p>
          <small>{new Date(c.createdAt).toLocaleString()}</small>

          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Progress, blockers, improvement areas..."
      />

      <button onClick={handleAdd}>Add Comment</button>
    </div>
  );
}
