const product = require('./Model/productModel')
const products = require('./data/product.json')
const connectDB = require('./config/database')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path:path.join(__dirname,"config/config.env")})


const seed=async () => {
    try {
        await connectDB
        await product.deleteMany()
        console.log('deleted')
        await product.insertMany(products)
        console.log('inserted')
        
    } catch (error) {
        console.log(err)
    }
    process.exit()
}
seed()