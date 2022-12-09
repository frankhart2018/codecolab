import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from 'express-session'
import SessionController from "./controllers/session/session-controller.js";
import UsersController from "./controllers/users/user-controller.js";
import ProjectController from "./controllers/project/project-controller.js";
import cookieParser from "cookie-parser";
const JWT_SECRET = process.env.JWT_SECRET;

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/Codify";
console.log("CONNECTION_STRING ", CONNECTION_STRING);
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

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
app.use(session({
    secret: "hfdjkfsfjsfjdsfkhfoihfi0933j&*092jdd&(@!2jfdfj",
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false, maxAge: 86400}
}))
app.use(cookieParser());
app.use(express.json());

UsersController(app);
SessionController(app)

ProjectController(app);

app.listen(process.env.PORT || 4000);
