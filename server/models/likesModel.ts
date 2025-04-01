import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  like: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
  createdAt: {
    type: Date, 
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

}, {
  timestamps: true,});

const Likes = mongoose.model("Likes", likesSchema);

export default Likes;