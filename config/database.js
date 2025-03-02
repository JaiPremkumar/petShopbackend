const mongoose = require('mongoose')

const connectDb = mongoose
.connect('mongodb+srv://premjai411:86HkmKGsm7n90OF2@cloud-cluster.nkcoz.mongodb.net/pets-shop?retryWrites=true&w=majority&appName=Cloud-Cluster',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((con)=>{
    console.log(`Mongodb connect to the host: ${con.connection.host}`);
})
.catch((err)=>{
    console.log(err)
})

module.exports = connectDb