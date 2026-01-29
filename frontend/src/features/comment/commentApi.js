const BASE = "http://localhost:3000/api/comments";

export async function fetchComments(taskId, token) {
  const res = await fetch(`${BASE}/${taskId}/comments`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return res.json();
}

export async function postComment(taskId, content, token) {
  const res = await fetch(`${BASE}/${taskId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
  return res.json();
}

export async function deleteComment(commentId, token) {
  await fetch(`${BASE}/${commentId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}
