const mongoose=require('mongoose')

const productShema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        default:1
    },
    description:{
        type:String,
        require:true
    },
    seller:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    categories:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        default:1
    },
    stock:{
        type:Number,
        default:1
    },
    reviews:[
        {
            user:mongoose.Schema.Types.ObjectId,
            rating:{
                type:Number,
                 default:0
            },
            comment:{   
                type:String,
                required:true
                
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{ 
        type:Date,
        default:Date.now()
    }
})

let Schema = mongoose.model('products',productShema)
module.exports = Schema