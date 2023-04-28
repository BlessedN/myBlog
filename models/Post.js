import mongoose from "mongoose";

//Модель пользователя
const PostSchema = new mongoose.Schema( //в этой схеме мы опишем все свойства, которые могут быть у пользовваателя
    {
        title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true, // обязательно для заполнения
        unique: true, //почта должна быть уникальной
    },
    tags: {
        type: Array,
        default: [], 
    },
    viewsCount: {
        type: Number, //количество просмотров статей
        default: 0, //по умолчанию количество просмотров статей 0
    },
    user: { // автор
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        },
    imageUrl: String, 
}, {
    timestamps: true, //при создании любой сущности(пользователя)
});

export default mongoose.model('Post', PostSchema)