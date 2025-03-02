exports.createOrder=async (req,res,next) => {
    const{
        orderItem,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body
    const orders = await Order.create({
        orderItem,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    })
    res.status(200).json({
        success:true,
        orders
    })
}

exports.getOrder=async (req,res,next) => {
    const orders = await Order.find()
    orders.forEach(order=>totalAmount+=order.taxPrice)
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
}

exports.singleOrder=async (req,res,next) => {
    const order = await Order.findById(req.params.id)
    if(!order){
        return res.status(400).json({
            success:false,
            message:'order not found'
        })
    }
    res.status(200).json({
        success:true,
        order
    })
}

exports.myOrder=async (req,res,next) => {
    const orders = await Order.find({user:req.user.id})

    res.status(200).json({
        success:true,
        orders
    })
}