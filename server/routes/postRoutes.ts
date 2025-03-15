import {Router} from 'express';
import {getPosts, getPost, creatPost, updatePost,deletePost } from '../controllers/postController';


const postRouter = Router();

postRouter.route('/').get(getPosts).post(creatPost);

postRouter.route('/:id').get(getPost).put(updatePost).delete(deletePost);

export default postRouter;