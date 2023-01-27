const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan');

const productRoutes = require('./routes/product.routes.js')

const app = express()
app.use(morgan('dev'));

const corsOptions = {
//     origin: 'https://petshop-client.onrender.com',
    origin: '*',
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use('/public', express.static('public'));

app.use('/home', productRoutes)

mongoose.connect('mongodb+srv://Daniel:firstmongodb@cluster0.56wbh.mongodb.net/test')

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('MongoDB connection established successfully!')
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
