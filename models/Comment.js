import mongoose from "mongoose";

// Модель комментария
const СommentSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    },
    user: {
        type: Object,
        ref: 'User',
        require: true,
    }
})

export default mongoose.model('Comment', СommentSchema)