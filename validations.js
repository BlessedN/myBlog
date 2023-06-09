import { body } from 'express-validator';

// //создание валидации авторизации
export const loginValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5}),
];

// //создание валидации регистрации
export const registerValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5}),
    body('fullName', 'Укажите имя').isLength({ min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

// //создание валидации статьи
export const postCreateValidation = [
    body('title','Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(), // optional() - у статьи может быть картинка, а может и не быть
];
