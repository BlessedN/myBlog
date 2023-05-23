import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const createComment = async (req, res ) => {
    try {
        const post = await PostModel.findById(req.body.post);
        const doc = new CommentModel({
            text: req.body.text,
            date: req.body.date,
            post: req.body.post
        });
        if (!post) { // если пост не найден, возвращаем ошибку
            return res.status(404).json({
                message: "Пост не найден"
            });
        }

    const comment = await doc.save();

    await PostModel.findByIdAndUpdate(
        req.body.post,
        { $addToSet: { comments: comment._id } }
    );

    res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось прокомментировать",
        });
    }
};

