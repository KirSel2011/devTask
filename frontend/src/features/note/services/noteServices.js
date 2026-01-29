const API_BASE = "http://localhost:3000/api/task"; // adjust if needed

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// ✅ Get all notes for a task
export const fetchNotesByTask = async (taskId) => {
  const res = await fetch(`${API_BASE}/${taskId}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

// ✅ Create a note
export const createNote = async (taskId, content) => {
  const res = await fetch(`${API_BASE}/${taskId}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ content })
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

// ✅ Update a note
export const updateNote = async (noteId, content) => {
  const res = await fetch(`${API_BASE}/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ content })
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
};

// ✅ Delete a note
export const deleteNote = async (noteId, taskId) => {
  console.log("What is the noteId to be deleted deletAPI: ", noteId)
  const res = await fetch(`${API_BASE }/${taskId}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!res.ok && res.status !== 204) throw new Error("Failed to delete note");
  return true;
};
