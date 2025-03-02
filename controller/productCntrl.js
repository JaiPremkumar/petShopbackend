const { default: mongoose } = require('mongoose');
const Product = require('../Model/productModel')

exports.newProduct=async (req,res,next) => {
    const{name,price,description,seller,image}=req.body;
    const Product =await Product.create({
        name,price,description,seller,image
    })
    res.status(200).json({
        success:true,
        product
    })
}

exports.getProducts=async (req,res,next) => {
    const products = await Product.find()
    res.status(200).json({
        success:true,
        products
    })
}

exports.singleProduct=async (req,res,next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({
            success:false,
            message:'invalid product Id'
        })
    }
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({
            success:false,
            message:'product not found'
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}

exports.updateProduct=async (req,res,next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({
            success:false,
            message:'product not found'
        })}
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
        })
        res.status(200).json({
            success:true,
            product
        })
}