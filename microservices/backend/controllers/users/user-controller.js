import * as userDao from './user-dao.js';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
const JWT_SECRET = process.env.JWT_SECRET

let currentUser = null

const UsersController = (app) => {
    app.post('/api/login', findUser);
    app.post('/api/register', createUser);
    app.post('/api/userData', userData);
    app.post('/api/forget-password', forgetPassword);
    app.get('/api/reset-password/:id/:token', resetPassword);
    app.post('/api/update-password/:id/:token', updatePassword);
    app.post('/api/logout', logoutUser);
}

const findUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userDao.findUser({email});
    if (!user) {
        return res.json({ message: "User Not found" });
    }
    if (!await bcrypt.compare(password, user.password)) {
        return res.json({ message: "Invalid Credentials" });
    }
    else {
        req.session['currentUser'] = user
        const token = Jwt.sign({ email: email }, JWT_SECRET, {
            expiresIn: 86400
        });
        if (res.status(201)) {
            return res.json({ status: "ok", data: token});
        } else {
            return res.json({ error: "error" });
        }
    }

}

const createUser = async (req, res) => {
    const { email, password, name, username } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userPresent = await userDao.findUser(email);
    if (userPresent) {
        return res.status(400).json({ message: 'User already exists' });

    }
    const currentUser = await userDao.createUser(email, encryptedPassword, name, username);
    req.session['currentUser'] = currentUser
    res.status(201).json({ message: 'User created successfully', status: "ok" });
}


const userData = async (req, res) => {
    const { token } = req.body;
    if (req.session['currentUser']) {
        res.status(201).json({ user: currentUser });
    }
    else {
        try {
            const user = Jwt.verify(token, JWT_SECRET);
            const useremail = user.email;
            userDao.findUser(useremail).then((user) => {
                res.status(201).json({ user: user });
            });
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    }
}

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await userDao.findUser(email);
    if (!user) {
        return res.json({ status: '404', message: "User Not found" });
    }
    const secret = JWT_SECRET + user.password;
    const token = Jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "5m",
    });
    const link = `${process.env.PROJECT_URL}/api/reset-password/${user._id}/${token}`;
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "team27neu@gmail.com",
            pass: "gvsvokpuxkhwsezu",
        },
    });

    var mailOptions = {
        from: "team27neu@gmail.com",
        to: user.email,
        subject: "Password Reset",
        text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    res.status(201).json({ status: "ok", message: "Email sent" });
}

const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const oldUser = await userDao.findUserById({ _id: id });
    if (!oldUser) {
        return res.status(400).json({ status: 400, message: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = Jwt.verify(token, secret);
        return res.status(201).json({ status: 201, message: "ok" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: "Invalid Token" });
    }
}

const updatePassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const oldUser = await userDao.findUserById({ _id: id });
    if (!oldUser) {
        return res.json({ status: 400, message: "User does not exist" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = Jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await userDao.updatePassword(id, encryptedPassword);
        return res.status(201).json({
            status: 201,
            message: "Password Updated Successfully"
        });
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: "Invalid Token" });
    }
}

const logoutUser = async (req, res) => {
    console.log("Hitting api")
    const authHeader = req.headers["authorization"];
    Jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            res.send({msg: "Logged out successfully"})
        }
        else {
            res.send({err})
        }
    })
}
export default UsersController;
