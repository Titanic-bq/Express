const express = require("express");
const path = require("path");
const posts = require("./routes/posts");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");
const PORT = process.env.PORT;

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

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
