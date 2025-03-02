const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Enter a name']
    },
    email:{
        type:String,
        require:[true,'Enter a email'],
        unique:true,
        validator:[validator.isEmail,'Enter valid email']
    
    },
    password:{
        type:String,
        require:[true,'Enter a password'],
        maxLength:[6,'must be 6 character']
    },
    avator:{
        type:String,
        
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
userSchema.pre('save',async function(next) {
    this.password = await bcrypt.hash(this.password,10)
})
userSchema.methods.getJwtToken=function () {
    return jwt.sign({id:this.id},process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}
userSchema.methods.isValidPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
  

let Schema = mongoose.model('users',userSchema)
module.exports = Schema;