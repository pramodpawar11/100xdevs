import express from "express";
import prisma from "../DB/db.config.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({});
  res.json({ post: posts });
});
router.post("/", async (req, res) => {
  const { user_id, description, title } = req.body;
  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      description,
      title,
    },
  });
  res.json({ status: 400, newPost: newPost, msg: "new post is created" });
});
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const post =await prisma.post.findFirst({
    where: {
      id: Number(userId),
    },
  });
  res.json({ status: 400, post: post });
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { title, description, user_id } = req.body;
  const updatedPost =await prisma.post.update({
    where: {
        id: Number(userId),
    },
    data: {
      title,
      description,
      user_id:Number(userId),
    },
  });
  res.json({ msg: "updated", updatedPost: updatedPost });
});
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const deletePost = await prisma.post.delete({
    where: {
      id: Number(userId),
    },
  });
  res.json({ msg: "post have been deleted" });
});

export default router