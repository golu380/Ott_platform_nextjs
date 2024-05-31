"use server";

import { COMPILER_NAMES } from "next/dist/shared/lib/constants";
import connectToDB from "../api/database";
import Joi from "joi";

import User from '../api/models/user';
import { SALT } from "../config";
import JwtService from "../services/Jwtsercvice";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";

export async function registerUserAction(formData){
    console.log(formData)
    await connectToDB();
    const {name,email,password,mobile} = formData;
    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        mobile: Joi.required(),
        password: Joi.string()
          .pattern(
            new RegExp(
              "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
            )
          )
          .required(),
        // confirm_password:Joi.ref('password')
      });
      const {error} = registerSchema.validate(formData);
      if(error){
        return {
            message: "Please insert proper data",
            sucess: false
        }
      }
      
    try{
        
        console.log(name,email,password,mobile)
        const checkUser = await User.findOne({email});
        console.log(checkUser);

        if(checkUser){
            return {
                success : false,
                message : "User already exists"
            }
        }
        const hashedpass = await bcrypt.hash(password,Number(SALT))
        const newlyCreatedUser = new User({
            name,
            email,
            password:hashedpass,
            mobile
        })
       
        const savedUser = await newlyCreatedUser.save();
        const access_token = JwtService.sign({
            savedUser
        })

        if(savedUser && access_token){
            return{
                success : true,
                message : "User created successfully",
                // data:JSON.parse(JSON.stringify(savedUser)),
                access_token:access_token
            }
        }else{
            return {
                success: false,
                message: "some thing went wrong"
            }
        }
    }catch(err){
        console.log(err);
        return{
            message:"some thing error ocured",
            success : false
        }
    }
}


export async function loginUserAction(formData){

    const {email,password} = formData;
    await connectToDB()
    const registerSchema = Joi.object({

        email: Joi.string().email().required(),
     
        password: Joi.string()
          .pattern(
            new RegExp(
              "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
            )
          )
          .required(),
        // confirm_password:Joi.ref('password')
      });
      const {error} = registerSchema.validate(formData);
      if(error){
        return {
            message: "Please insert proper data",
            sucess: false
        }
      }

    try{
        const user = await User.findOne({email})
        if(!user){
            return {
                message: "User not found",
                islogin: "false"
            }
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return {
                message: "Password is incorrect",
                islogin:"false"
            }
        }
        
        const access_token = JwtService.sign({
            _id:user._id,
            name:user.name,
            email:user.email

        })
        const getcookies = cookies();
        getcookies.set("token",access_token)
        return {
            message:"login successfully",
            islogin:true
        }

    }catch(error){
        console.log(err)
        return {
            message:"server inernal error",
            islogin:false
        }
    }


}

export async function validateUserAction(){
    await connectToDB();
    try{
        const getCookies = cookies();
        const token = getCookies.get("token")?.value || "";
        if(token === ""){
            return {
                success:false,
                message:"Token is invalid"
            }
        }
        const decoded = JwtService.verify(token);
        const user = await User.findOne({_id:decoded._id})
        if(user){
            return {
                success: true,
                data:JSON.parse(JSON.stringify(user))
            }
        }else{
            return {
                success : false,
                message : "Some error occured ! Please try again"
            }
           
        }
    }catch(error){
        console.log(error)
        return {
            success: false,
            message: "Something went wrong ! please try again"
        }
    }
}

export async function logoutAction() {
    const getCookies = cookies();
    console.log(getCookies.get("token").value)
    getCookies.set("token", "");
  }