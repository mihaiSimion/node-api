const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    const orders = Order.find()
    .select('quantity  product _id')
    .then(docs => res.status(200).json(docs))
    .catch(err => res.status(500).json({
        error: err
    }));
    
});

router.post('/', (req, res, next) => {
    
    const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
    });

    order.save()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({
        error:err
    }));
});

module.exports = router;