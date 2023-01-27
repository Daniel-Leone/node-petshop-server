const express = require('express')
const router = express.Router()
const multer = require('multer')
const Product = require('../models/product.model.js');
const Admin = require('../models/admin.model.js');

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, './public')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

// LOGIN

router.get('/adminAuth', (req, res) => {

    Admin.find()
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        console.log('get not works', err)
        res.status(400).res.json('Error: ', err)
    } )

})

// GET ALL PRODUCTS

router.get('/', (req, res) => {
    Product.find()
    .then(prod => {
        console.log('get works', prod)
        res.json(prod)
    })
    .catch(err => {
        console.log('get not works', err)
        res.status(400).res.json('Error: ', err)
    }
)})

// CREATE NEW PRODUCT

router.post('/admin/add', upload.single('productImage'), (req, res) => {

    if(!req.body.title){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    
    const url = req.protocol + '://' + req.get('host')

    const product = new Product({
        brand: req.body.brand,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight,
        productImage: url + '/public/' + req.file.filename,
        stagePet: req.body.stagePet,
        animal: req.body.animal
    });

    product
    .save()
    .then( () => {
        console.log('post works')
        res.json('the new product was posted successfully')
    })
    .catch( err => {
        console.log('post not works', err)
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        })
    } )
})

// REQUEST FIND PRODUCT BY ID

router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
    .then(prod => res.json(prod))
    .catch(err => res.status(400).res.json('Error: ', err))
})

// FIND AND UPDATE BY ID

// router.put('/admin/:id', upload.single('productName'), (req, res) => {
router.put('/admin/:id', (req, res) => {

    if(!req.body.title){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    Product.findById(req.params.id)
    .then( prod => {
        prod.brand = req.body.brand,
        prod.title = req.body.title,
        prod.description = req.body.description,
        prod.price = req.body.price,
        prod.weight = req.body.weight,
        prod.stagePet = req.body.stagePet,
        prod.animal = req.body.animal
        // prod.productImage = req.file.originalname

        prod
        .save()
        .then( () => {
            console.log('update works')
            res.json('product updated successfully')
        })
        .catch(err => {
            console.log('put not works', err)
            res.status(400).json('error: ', err)
        })
    })
    .catch( err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        })
    } )
})

// FIND AND DELETE BY ID

router.delete('/admin/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then( () => {
        console.log('delete works')
        res.json('the product was deleted')
    } )
    .catch( err => {
        console.log('delete not works', err)
        res.status(400).json('error: ', err)
    })
})

module.exports = router
