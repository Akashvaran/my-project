import express from 'express';
import { SignUp, Login, VerifyAuth, Logout, updateUser, singleData, upload, ForgetPassword, ResetPassword } from '../controller/authControler.js';
import { Verification } from '../midelware/Verification.js';

const authRoute = express.Router();

authRoute.route('/signup').post(SignUp);
authRoute.route('/login').post(Login);
authRoute.route('/auth').get(VerifyAuth);
authRoute.route('/logout').get(Logout);
authRoute.route('/:id').get(Verification, singleData);
authRoute.route('/:id').put(Verification, upload.single('ProfilePic'), updateUser);
authRoute.route('/forget').post(ForgetPassword);
authRoute.route('/reset/:token').post(ResetPassword);
export default authRoute;
