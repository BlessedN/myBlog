// import express from "express";

import mongoose from "mongoose";

import UserModel from './models/User.js'
import { registerValidation } from "./validations.js";
// import checkAuth from "./utils/checkAuth.js";

// import * as UserController from './controllers/UserController';
// import * as PostController from './controllers/PostController';

import express from 'express';
import { validationResult } from "express-validator";


mongoose
  .connect("mongodb+srv://mongo:mongo123@cluster0.ybbmxdp.mongodb.net/infablog?retryWrites=true&w=majority")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.post('/auth/register', registerValidation, (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json(errors.array());
  }

const doc = new UserModel({ //create user in BD
  email: req.body.email,
  fullName: req.body.fullName,
  avatarUrl: req.body.avatarUrl,
  passwordHash: req.body.passwordHash,
});

  res.json({
    success: true,
  });
});


app.listen(4444, (err) => { //команда, запуска сервера
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
}); 


// // // // npm run start:dev
