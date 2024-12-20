import {User} from '../models/user.js';
import bcrypt from 'bcrypt';
import { sendCookie } from '../utils/features.js';

export const getAllUsers = async (req, res) => {
    res.json({ message: "All Users" });
}

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
    let user = await User.findOne({email});

    if(user) return next(new ErrorHandler("User Already Exists", 400));
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({name, email, password: hashedPassword});
    sendCookie(user, res, "User Registered Successfully",201);
    } catch (error) {
        next(error);
    }
}



export const getMyProfile =  (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });
};




export const login = async(req,res,next) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");
        if(!user) return next(new ErrorHandler("User Does not Exists", 400));
        const isMatch = await bcrypt.compare(password, user.password);
    
        if(!isMatch) return next(new ErrorHandler("Invalid Credentials", 400));
    
        sendCookie(user,res,"Welcome Back", 200); 
    } catch (error) {
        next(error);
        
    }
}


export const logout = async(req,res) =>{
    try {
        res.status(200).cookie("token","",{
            expires: new Date( Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "Logged Out Successfully",
        })
    } catch (error) {
        next(error);
    }
}