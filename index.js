import express from 'express';
import mongoose from "mongoose";
import { loginValidation, registerValidation, postCreateValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { validationResult } from "express-validator";
import { register, login, getMe } from './controllers/UserController.js';
// import { UserController } from './controllers/index.js';
// import { PostController } from './controllers/index.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
  .connect("mongodb+srv://mongo:mongo123@cluster0.ybbmxdp.mongodb.net/infablog?retryWrites=true&w=majority")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());                          // из-за этого была ошибка

app.post('/auth/login',loginValidation, UserController.login);
app.post('/auth/register',registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts',checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', PostController.update);



app.listen(4444, (err) => { 
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
}); 

// // // // npm run start:dev
