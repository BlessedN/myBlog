import express from 'express';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from './models/User.js'
import { registerValidation } from "./validations.js";
// import checkAuth from "./utils/checkAuth.js";

// import * as UserController from './controllers/UserController';
// import * as PostController from './controllers/PostController';


import { validationResult } from "express-validator";


mongoose
  .connect("mongodb+srv://mongo:mongo123@cluster0.ybbmxdp.mongodb.net/infablog?retryWrites=true&w=majority")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json()); // из-за этого была ошибка

app.post('/auth/login', async (req,res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email});

    if(!user){
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPass){
      return res.status(400).json({
        message:'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
    _id: user._id,
    },
    'pasww123',
    {
      expiresIn: '30d',
    }
    );
    const {passwordHash, ... userData} = user._doc;

    res.json({
      ... userData, //
      token,
    });
  } 
  catch (err){}
})

app.post('/auth/register', registerValidation, async (req,res) => {
  try {
    const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json(errors.array());
  }

const password = req.body.password; 
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

const doc = new UserModel({ //create user in BD
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
'pasww123',
{
  expiresIn: '30d',
}
);

const {passwordHash, ... userData} = user._doc;

  res.json({
    ... userData, //
    token,
  });
  } catch (err){
    console.log(err);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    })
  };
});

app.listen(4444, (err) => { //команда, запуска сервера
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
}); 


// // // // npm run start:dev
