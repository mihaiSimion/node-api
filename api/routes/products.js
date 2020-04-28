const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
           const response = {
                count: docs.length,
                products : docs.map(doc =>{
                    return{
                    id: docs._id,
                    name: docs.name,
                    price: docs.price,
                    resposne: {
                        route: "/products",
                        type: "GET" ,
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
                })
           };
           res.status(200).json(response);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc),
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
});

router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
       
    });
    product.save().then(result =>{
        console.log(result),
        res.status(200).json(result)
    }).catch(err => {
        console.log(err),
        res.status(500).json({error:err})
    });

});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;

    Product.remove({ _id: id })
    .exec()
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            error: err

        })
    });
});

router.patch("/:productId", (req,res,next) =>{
    const id = req.params.productId;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });

});

module.exports= router;