const cartRoute = require('express').Router();
const Cart = require('./db').Cart;
const Products = require('./db').Products;
const Users = require('./db').Users;
const Vendors = require('./db').Vendors;

cartRoute.get('/',async (req,res)=>{
    const cartList = await Cart.findAll({
        include:[Products,Users]
    });
    res.send({success: true, data:cartList})
});

cartRoute.get('/:uid', async (req,res)=>{
    const uId = parseInt(req.params.uid);
    const cartByUserId = await Cart.findAll({
        include: [{ model: Products,
             include: Vendors}],
        where:{
            userId: uId
        }
    })
    res.send({success: true, data:cartByUserId})
});

cartRoute.post('/',async(req,res)=>{
    try{
        const result = await Cart.create({
            quantity: req.body.quantity,
            cost: req.body.cost,
            userId: req.body.userId,
            productId: req.body.productId
        })
        res.send({success:true, data: result})
    }catch(err){
        res.send({success: false, error: err.message})
    }
})

module.exports = cartRoute;