const express = require("express");
const router = express.Router();

let posts = [
  { id: 1, title: "First Post" },
  { id: 2, title: "Second Post" },
];

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`,
  );
  next();
};

//All
router.get("/", logger, (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});
//Single
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    const error = new Error("A post with the id of ${id} was not found");
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json(post);
  }
});

// Create new post
router.post("/", (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error("Please include a title");
    error.status = 400;
    return next(error);
  } else {
    posts.push(newPost);
  }

  res.status(201).json({ message: "Post created" });
});
// Update post
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error("A post with the id of ${id} was not found");
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

// Delete post
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== id);

  if (!post) {
    const error = new Error("A post with the id of ${id} was not found");
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});
module.exports = router;
