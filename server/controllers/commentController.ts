import { Request, Response } from "express";
import Comment from "../models/commentModel";
import Post from "../models/postModel";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name")
      .populate("post", "title");
    res.json({ comments, message: "すごいすごい" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "やめやめ" });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  const { post } = req.params;
  try {
    const comments = await Comment.find
      ({ post })
      .populate("user", "name")
      .populate("post", "title");
    res.json({ comments, message: "すごいすごい" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "やめやめ" });
  }
}

export const getComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id)
      .populate("user", "name")
      .populate("post", "title");
    res.json({ comment, message: "すごいすごい" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "やめやめ" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { content, user, post } = req.body;
  if (!content || !user || !post) {
    res.status(400).json({ message: "だめです" });
    return;
  }

  const postExists = await Post.findById(post
  );
    if (!postExists) {
        res.status(400).json({ message: "だめです" });
        return
    }
  try {
    const comment = new Comment({
      content,
      user,
      post,
    });
    await comment.save();

    await Post.findByIdAndUpdate(post, { $inc: { commentsCount: 1 } });
    res.json({ comment, message: "すごいすごい" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "やめてやめて" });
  }
};

export const deleteComment = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const { post } = req.body;
  try {
    await Comment.findByIdAndDelete(id);
    await Post.findByIdAndUpdate(post, {$inc: {commentsCount: -1}});
    res.json({ message: "すごいすごい" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "やめてやめて" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ message: "だめです" });
    return;
  }
  try {
    await Comment.findByIdAndUpdate
    (id, { content });
    res.json({ message: "すごいすごい" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "やめてやめて" });
  }
};
