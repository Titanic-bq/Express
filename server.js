const express = require("express");
const path = require("path");
const posts = require("./routes/posts");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");
const PORT = process.env.PORT;
const { fileURLToPath } = require("url");

// Get directory name

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger middleware
app.use(logger);

// static folder
app.use(express.static(path.join(__dirname, "public")));

// Rotes

app.use("/api/posts", posts);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
