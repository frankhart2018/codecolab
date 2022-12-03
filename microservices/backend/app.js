import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import session from 'express-session'
import UsersController from './controllers/users/user-controller.js';
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://localhost:27017/Codify';
const JWT_SECRET = process.env.JWT_SECRET
console.log(CONNECTION_STRING)


const corsOptions = {
    origin: 'http://localhost:3000',
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

app.use(cors(corsOptions));
app.use(session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}))
app.use(express.json());

UsersController(app);

app.listen(process.env.PORT || 4000);