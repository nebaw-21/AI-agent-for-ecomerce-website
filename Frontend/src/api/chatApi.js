// src/api/chatApi.js
export async function sendChatMessage(user_id, message) {
  const res = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, message }),
  });
  if (!res.ok) throw new Error('Failed to get response from backend');
  const data = await res.json();
  return data.response;
}
