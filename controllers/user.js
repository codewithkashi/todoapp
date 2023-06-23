import User from "../models/user.js"
import Task from "../models/task.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async(req, res, next)=>{
    try {
        const {email, password} = req.body
    const userData = await User.findOne({email}).select("+password")
    
    if(userData==null){
        res.json({
            success: false, 
            message: "Register First"
        })
        return
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    const token = jwt.sign({_id:userData.id}, "kashif")
    if(userData.email!=null && !(isMatch)){
        res.json({
            success: false, 
            message: "Wrong Password"
        })
    }
    else if(userData.email!=null && isMatch){
        res.cookie("token", token, {maxAge: 36000, httpOnly: false, sameSite:"none", secure: true}).json({
            success: true, 
            message: "Logged in"
        })
    }
    } catch (error) {
        res.json({
            success: false, 
            message: "Internal Serve Error"
        })
    }
}



export const register = async(req, res)=>{
   try {
    const {name, email, password} = req.body
    const user = await User.findOne({email})

    if(user!=null){
        res.json(
            {
                success: false, 
                message: "User already exists"
            }
        )
        return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({name, email, password:hashedPassword})
    return res.status(201).json(
        {
            success: true, 
            message: "User registered"
        }
    )
   } catch (error) {
    res.json({
        success: false, 
        message: "Internal Serve Error"
    })
    console.log(error)
   }
}
    
export const getMyProfile = async(req, res)=>{
    try {
        const {token} = req.cookies
    if(!token){
        res.json({
            success: false, 
            message: "Login First"
        })
        return
    }
    const decodedToken = jwt.verify(token, "kashif")
    const user = await User.findById(decodedToken._id)
    if(user){
        res.json(user)
    }
    else{
        res.json({
            success: false, 
            message: "Cookie did not Match"
        })
    }
    } catch (error) {
        res.json({
            success: false, 
            message: "Internal Serve Error"
        })
    }
}


export const logout = (req, res)=>{
     res.cookie("token", null, {expires: new Date(Date.now()),httpOnly: false, sameSite:"none", secure: true}).json({
        success: true, 
        message: "Logged Out"
    })
}