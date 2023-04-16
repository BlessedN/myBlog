import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; //зашифровка паролей
import { validationResult } from "express-validator"; //проверка есть ли ошибка при валидации формы регистр

import UserModel from "../models/User.js";

export const register = async (req, res) => { 
try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt); // хороший способ шифрования пароля

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
    {
        _id: user._id,
    },
        "secret123",
    {
        expiresIn: "30d",
    }
    );

    const { passwordHash, ...userData } = user._doc; // вытащим с помощью свойства деструкторизации passwordHash

    res.json({
      ...userData, //возращает документ о пользвателе
        token,
    });
    } catch (err) {
    console.log(err);
    res.status(500).json({
        message: "Не удалось зарегистрироваться",
    });
}
};


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email}); //проверка есть ли пользователь в базе 

        if(!user){
            return res.status(404).json({
            message: 'Пользователь не найден',
        });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash); //сходится ли логин и пароль

        if(!isValidPass){
            return res.status(400).json({
            message: 'Неверный логин или пароль', //пишем так,хотя знаем, что неверный только пароль
            })
        }

        const token = jwt.sign(
        {
            _id: user._id,
        },
            "secret123",
        {
            expiresIn: '30d',
        },
        );

        const { passwordHash, ... userData } = user._doc; // вытащим с помощью свойства деструкторизации passwordHash

    res.json({
        ...userData, //возращает документ о пользвателе
        token,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться",
        });
    }
};

export const getMe = async (req, res) => { //необходимо получить информацию о пользователе 
    try {
        //взять токен, который мы будем передавать в теле запросара на /auth/me, рассшифровать и понять может ли пользователь, который сделал сейчас запрос получить инфу о себе по этому токену или имеет ли доступ к этому запросу 
            const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
            message: 'Пользователь не найден'
            })
        }
          const { passwordHash, ... userData } = user._doc; // вытащим с помощью свойства деструкторизации passwordHash

      res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: "Нет доступа",
        });
    }
}

//1.26.29