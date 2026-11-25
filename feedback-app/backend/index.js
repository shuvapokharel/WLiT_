const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let feedbacks = [
  { id: 1, name: "Workshop Team", message: "Backend is connected! Now wire up the POST route." }
];
let nextId = 2;

// 1. GET all feedback (Already working!)
app.get("/api/feedback", (req, res) => {
  res.status(200).json(feedbacks);
});

// 2. POST new feedback
app.post("/api/feedback", (req, res) => {
  const { name, message } = req.body;

  // TODO 1 (Validation Twist):
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!message || message.trim().length < 5) {
    return res.status(400).json({ error: "Message must be at least 5 characters" });
  }
  // TODO 2 (Save & Respond):
  
  const newFeedback = { id: nextId++, name: name.trim(), message: message.trim() };
  feedbacks.unshift(newFeedback);
  return res.status(201).json(newFeedback);
});

app.listen(PORT, () => {
  console.log(`Feedback API running at http://localhost:${PORT}`);
});