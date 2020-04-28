const express = require('express');
const app = express();
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders')

mongoose.connect('mongodb+srv://mihai-shop:' + process.env.MongoPw + '@mihai-shop-yg5ry.mongodb.net/test?retryWrites=true&w=majority');

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use((req,res,next) =>{
    const error = new Error('404 Not found');
    error.status(404);
    next(error);
});

app.use((error,req,res,next) =>{
    res.json({
        name: 'Route not found'
    });
});

module.exports = app;