const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next) => {
    
});

router.get('/:id', (req, res, next) => {
    
});

router.post('/', (req, res, next) => {
    const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body,quantity,
            product: req.body.productId
    });

    order.save()
    .exec()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/', (req, res, next) => {
    
});

router.patch('/', (req, res, next) => {
    
});

module.exports = router;