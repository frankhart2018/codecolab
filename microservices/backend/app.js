import express from 'express';
import cors from 'cors';
import UsersController from './controllers/users/user-controller.js';
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://localhost:27017/Codify';
console.log("CONNECTION_STRING ", CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
const app = express()
app.use(cors(corsOptions));
app.use(express.json());

UsersController(app);

app.listen(process.env.PORT || 4000);