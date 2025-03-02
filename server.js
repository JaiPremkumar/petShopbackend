const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const connectDb = require('./config/database')
const cors = require('cors')

app.use(express.json())
app.use(cookieParser())
app.use(cors())
dotenv.config({path: path.join(__dirname, "config/config.env") });

const products = require('./route/product')
const users = require('./route/user')
const payment = require('./route/payment')
const order = require('./route/order')


app.use(`/api/v1`,products) 
app.use(`/api/v1`,users)
app.use('/api/v1',payment)
app.use('/api/v1',order)

app.listen(process.env.PORT,async()=>{
    try {
       await connectDb;
       console.log(`server in ${process.env.PORT} & env ${process.env.NODE_ENV}`)
    } catch (error) {
        console.log(err) 
    }
})