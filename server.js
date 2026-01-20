const express = require("express");
const path = require("path");
const posts = require("./routes/posts");
const logger = require("./middleware/logger");
const PORT = process.env.PORT || 8000;

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger middleware
app.use(logger);

// static
// app.use(express.static(path.join(__dirname, "public")));

// Rotes

app.use("/api/posts", posts);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
