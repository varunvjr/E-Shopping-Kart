import e from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc create order
//@route POST /api/orders
//@access Private 
export const addOrderItems=asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body
    if(orderItems&&orderItems.length===0){
        res.status(400)
        throw new Error("No Order Items");
        return;
    }else{
        const order=new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice
        })
        await order.save();
        res.status(200).json(order);
    }
});

//@desc GET order by Id
//@route GET /api/orders/:id
//@access Private

export const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order)
    }else{
        res.status(400)
        throw new Error('Order not found')
    }

})

//@desc Update Order To Paid
//@route GET /api/orders/:id/pay
//@access Private

export const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder=await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(400)
        throw new Error("Order not found")
    }

})