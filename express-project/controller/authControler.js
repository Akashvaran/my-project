import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { fileURLToPath } from 'url'; 
import fs from 'fs'
import path from 'path';
import authenticationModel from '../model/authithantication.js';
import nodemailer from 'nodemailer'


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '../uploads');


if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadsDir); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// SignUp function to register a new user
const SignUp = async (req, res) => {
    const { Name, Email, Mobile, Password } = req.body;

    try {
        const user = await authenticationModel.findOne({ Email });
        if (user) {
            return res.status(400).json({ success: false, msg: "User already exists" });
        } else {
            const hashPassword = await bcrypt.hash(Password, 10);
            const userData = new authenticationModel({
                Name,
                Email,
                Mobile,
                Password: hashPassword,
            });
            await userData.save();
            res.status(201).json({ success: true, msg: "User created successfully", user: userData });
        }
    } catch (err) {
        console.error('Error occurred during signup:', err);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Login function to authenticate and generate token for user
const Login = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await authenticationModel.findOne({ Email });
        
        if (!user) {
            return res.status(400).json({ success: false, msg: "User not found" });
        }

        const matchPassword = await bcrypt.compare(Password, user.Password);
        if (!matchPassword) {
            return res.status(400).json({ success: false, msg: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '24h' });
        res.cookie('accessToken', token, { secure: true, httpOnly: true });

        return res.status(200).json({ success: true,username:{...user}, msg: "Login successful", token });
    } catch (err) {
        console.error('Error occurred during login:', err);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

//Fuction forget password

const ForgetPassword = async (req, res) => {
    const { Email } = req.body;
    try {
        const user = await authenticationModel.findOne({ Email });
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "5m" });
        const encodedToken = encodeURIComponent(token);

        const transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                 user: "akashseenivasan2005@gmail.com",
                 pass: "hwsq bsdy xcyw ghdl"
            }
        });

        const resetLink = `http://localhost:5173/reset/${encodedToken}`;
        const mailOptions = {
            from: "your-email@gmail.com",
            to: Email,
            subject: "Reset Password",
            html: `
                <h1>Reset Password Link</h1>
                <p>Please click the link below to reset your password: <a href="${resetLink}">${resetLink}</a></p>
            `,
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Mail error", error);
                return res.status(500).json({ status: false, msg: "Failed to send email" });
            } else {
                console.log("Email sent: " + info.response);
                return res.status(200).json({ status: true, msg: "Mail sent" });
            }
        });
    } catch (err) {
        console.error('Error occurred during forget password:', err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

const ResetPassword = async (req, res) => {
    const { Password } = req.body;
    const { token } = req.params;

    try {
        const decodedToken = decodeURIComponent(token);
        const verified = jwt.verify(decodedToken, "secretkey");
        const userId = verified.id;

        if (!userId) {
            return res.status(400).json({ msg: "Invalid token" });
        }

        const hashPassword = await bcrypt.hash(Password, 10);

        const user = await authenticationModel.findByIdAndUpdate(userId, { Password: hashPassword }, { new: true });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ status: true, msg: "Password updated successfully" });
    } catch (e) {
        console.error('Error occurred during reset password:', e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};



// Function to fetch single user data
const singleData = async (req, res) => {
    const { id } = req.params;

    try {
        const userData = await authenticationModel.findById(id);
        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(userData);
    } catch (err) {
        console.error('Error occurred while fetching user data:', err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Function to update user data
const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.ProfilePic = path.join('uploads', req.file.filename).replace(/\\/g, '/');
        }
        const userData = await authenticationModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User updated", userData });
    } catch (err) {
        console.error('Error occurred while updating user data:', err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Function to handle user logout
const Logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.json({ status: true, msg: "Logout successful" });
};

// Function to verify user authentication
const VerifyAuth = async (req, res) => {
    res.json({ status: true, msg: "Authorized", user: req.user });
};

export { upload, SignUp, Login, Logout, updateUser, singleData, VerifyAuth ,ForgetPassword,ResetPassword};


