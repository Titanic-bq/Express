const express = require("express");
const path = require("node:path");
const app = express();

// static

// app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
];

app.get("/api/posts", (req, res) => {
  res.json(posts);
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
