<<<<<<< HEAD
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import session from 'express-session'
import UsersController from './controllers/users/user-controller.js';
import mongoose from "mongoose";
import SessionController from "./controllers/session/session-controller.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://localhost:27017/Codify';
const JWT_SECRET = process.env.JWT_SECRET
console.log(CONNECTION_STRING)


const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family: 4
}
mongoose.connect(CONNECTION_STRING, options);

const app = express()

=======
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import UsersController from "./controllers/users/user-controller.js";
import ProjectController from "./controllers/project/project-controller.js";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/Codify";
console.log("CONNECTION_STRING ", CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
>>>>>>> master
app.use(cors(corsOptions));
app.use(session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}))
app.use(express.json());

UsersController(app);
<<<<<<< HEAD
// SessionController(app)

app.listen(process.env.PORT || 3000);
=======
ProjectController(app);

app.listen(process.env.PORT || 4000);
>>>>>>> master
