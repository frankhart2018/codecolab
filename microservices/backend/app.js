import express from 'express';
import cors from 'cors';
import UsersController from './controllers/users/user-controller.js';
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.PROJECT_DB_CONNECTION_STRING
    || 'mongodb://localhost:27017/Codify';
mongoose.connect(CONNECTION_STRING);
console.log(CONNECTION_STRING);

const app = express()
app.use(cors());
app.use(express.json());

UsersController(app);

app.listen(process.env.PORT || 4000);