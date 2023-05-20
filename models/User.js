import mongoose from "mongoose";

// //Модель пользователя
const UserSchema = new mongoose.Schema({ //в этой схеме мы опишем все свойства, которые могут быть у пользователя
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true, //почта должна быть уникальной
    },
    passwordHash: {
        type: String,
        require: true, // обязательно для заполнения
    },
    avatarUrl: String, 
}, {
    timestamps: true, //при создании любой сущности(пользователя)
});

export default mongoose.model('User', UserSchema);