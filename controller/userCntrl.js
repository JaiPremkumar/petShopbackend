const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register=async (req,res,next) => {
    const {name,email,password,avator}=req.body
    const user = await User.create({
        name,email,password,avator
    })
    const token = user.getJwtToken()
    const options={
     expires: new Date(Date.now()+process.env.COOKIE_EXPIRES_TIMES * 24 * 60 * 60 * 100),
        httpOnly:true,
    }
    res.status(200)
    .cookie('token',token,options)
    .json({
        success:true,
        user,
        token
    })
}

exports.login=async (req,res,next) => {
    const{email,password} = req.body
    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"invalid user"
        })
    }
    const user = await User.findOne({email}).select('+password')
   if(!user){
    return res.status(400).json({
        success:false,
        message:'user invalid'
    })
   }
   if(!await bcrypt.compare(password,user.password)){
    return res.status(400).json({
        success:false,
        message:'user invalid'
    })
   }

   const token = user.getJwtToken()
   res.status(200).json({
    success:true,
    user,
    token
   })
}
exports.logoutUser=async (req,res,next) => {
    res.cookie('token',null),{
        expires: new Date(Date.now()),
        httpOnly:true
    }
    res.status(200).json({
        success:true,
        message:'successfully logout'
    })
    
}

exports.updateUser=async (req,res,next) => {
    const newData={
        name:req.body.name,
        email:req.body.email
    }
    let user = await User.findByIdAndUpdate(req.user.id,newData,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
    })
}

exports.deletUser=async (req,res,next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(400).json({
            success:false,
            message:'user not found'
        })
    }
    res.status(200).json({
        success:true,
        message:"user delete"
    })
}

exports.getUser=async (req,res,next) => {
const user=await User.findById(req.user.id)
res.status(200).json({
    success:true,
    user
})
}

exports.getAllUser=async (req,res,next) => {
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
}
exports.adminUpdateUser=async (req,res,next) => {
    const newData={
        name:req.body.name,
        email:req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id,newData,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
    })
}

exports.logOut=async (req,res,next) => {
    res.cookie('token',null),{
        expires: new Date(Date.now()),
        httpOnly:true
    }
    res.status(200).json({
        success:true,
        message:'successFully Logout'
    })
}