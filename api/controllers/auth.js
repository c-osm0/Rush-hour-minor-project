import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next) => {
    try{
        const pass = req.body.password;
        const cpass = req.body.cpassword;
        if (pass === cpass) {
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
            const newUser =new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
            })

            await newUser.save()
            // res.status(200).send("User has been created!")
            const token=jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin },process.env.JWT)
        const {password,isAdmin,...otherDetails} =newUser._doc;
            // res.cookie("access_token",token,{
            //     httpOnly:true,
            // } ).status(200).json({...otherDetails});
            res.status(200).json({token});
    }
}catch(err){
        next(err);
    }

}

export const login = async (req,res,next) => {
    try{

        const user=await User.findOne({email: req.body.email})
        if(!user)return next(createError(404,"User not found with this Email id!"));
        const isPasswordCorrect=await bcrypt.compare(
            req.body.password,
            user.password
            );
        if(!isPasswordCorrect)return next(createError(400,"Wrong password or Email-id!"));
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin },process.env.JWT)
        const {password,isAdmin,...otherDetails} =user._doc;
            // res.cookie("access_token",token,{
            //     httpOnly:true,
            // } ).status(200).json({...otherDetails});
            res.status(200).json({token});
    }catch(err){
        next(err);
    }

}