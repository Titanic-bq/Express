const express = require("express");
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";
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

//All posts
router.get("/", getPosts);
//Single post
router.get("/:id", getPost);

// Create new post
router.post("/", createPost);
// Update post
router.put("/:id", updatePost);
// Delete post
router.delete("/:id", deletePost);
module.exports = router;
