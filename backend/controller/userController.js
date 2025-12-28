import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
export const register = async (req,res)=>{
    try {
        const{username,email,password} = req.body


        if(!username || !email || !password){
          return  res.status(400).json({message:"please fill all the form"})
        }

        const  userExist = await User.findOne({email}) 
        if(userExist){
            return res.status(409).json({message:"user exist"})
        }

        const newUser = await User.create({username,email,password})
        // const hashPassword = await bcrypt.hash(password)
        const token = generateToken(newUser._id)
         res.status(200).json({
            id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            token
         })




    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



export const login = async(req,res)=>{

    try {
        const{email,password} = req.body


        if(!email || !password){
          return  res.status(400).json({message:"please fill all the form"})
        }

        const  userExist = await User.findOne({email}) 
        if(!userExist){
            return res.status(401).json({message:"user not found"})
        }


        const matchPassword = await bcrypt.compare(password,userExist.password)
        if(!matchPassword){
            return res.status(401).json({message:"password doesnt match"})
        }

        const token = generateToken(userExist._id)

        return res.status(201).json({
            id:userExist._id,
            email:userExist.email,
            token
        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
}