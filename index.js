// import express from "express";

// import mongoose from "mongoose";

// import { registerValidation, loginValidation} from "./validations.js";

// import checkAuth from "./utils/checkAuth.js";


// import * as UserController from './controllers/UserController';
// import * as PostController from './controllers/PostController';

import express from 'express';
import mongoose from 'mongoose';
import {registerValidation, loginValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController';

mongoose
  .connect(
    "mongodb+srv://mongo:mongo123@cluster0.ybbmxdp.mongodb.net/infablog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Helloooooo");
});
app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login); //запрос на логин
app.post("/auth/register", registerValidation, UserController.register); //запрос на регистрацию
app.get("/auth/me", checkAuth, UserController.getMe);

//app.get("/posts", PostController.getAll);
//app.get("/posts/:id", PostController.getOne);
//app.post("/posts", PostController.create);
//app.delete("/posts", PostController.create);

app.get("/posts", checkAuth, UserController.getMe);
app.get("/posts", checkAuth, UserController.getMe);
app.get("/posts", checkAuth, UserController.getMe);
app.get("/posts", checkAuth, UserController.getMe);

app.listen(4444, (err) => { //команда, запуска сервера
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
}); // запускаем сервер на порту

// // //
// // // npm run start:dev
// // // 53.30
/// 1:16:26

/// 1:24:30 статьи делаем 
