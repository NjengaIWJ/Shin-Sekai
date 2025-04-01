import { Request, Response } from 'express';
import { Like } from '../models/likesModel';
import { Post } from '../models/postModel';


export const likePost = async (req: Request, res: Response) => {
    const {user, post} = req.body;
    try{
        const postExists = await Post.findById(post);
        if (!postExists) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const existingLike = await Like.findOne({ user, post });
        if (existingLike) {
            return res.status(400).json({ message: 'You have already liked this post' });
        }
        const newLike = new Like({ user, post });
        await newLike.save();
        res.status(201).json({ message: 'Post liked successfully', like: newLike });

    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const unlikePost = async (req: Request, res: Response) => {
    const { user, post } = req.body;
    try {
        const existingLike = await Like.findOne({ user, post });
        if (!existingLike) {
            return res.status(404).json({ message: 'Like not found' });
        }
        await existingLike.remove();
        res.status(200).json({ message: 'Post unliked successfully' });
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

''

export const getLikes = async (req: Request, res: Response) => {
    const { post } = req.params;
    try {
        const likes = await Like.find({ post }).populate('user', 'username');
        res.status(200).json({ likes });
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




