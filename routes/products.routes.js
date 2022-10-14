const express = require('express');
const router = express.Router();
const Products = require('../models/products')
const multer = require('multer');



//Getting Image
//storage
const Storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: Storage,
}).single('productImage')

// router.post('/upload', (req, res) => {
//         upload(req, res, (err) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     const productImage = Products({
//                         image: {
//                             data: req.body.filename,
//                             contentType: 'image/png, image/jpeg'
//                         }
//                     })
//                     productImage.save()
//                         .then(() => res.send('Image Upload was a success')).catch(err => { console.log(err) })
//                 }
//             }

//         )
//     })
//Getting All
router.get('/', async(req, res) => {
    try {
        const product = await Products.find()
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

//Getting One Resource
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product)
})

//Creating One

router.post('/', async(req, res) => {
        upload(req, res, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const product = Products({
                            name: req.body.name,
                            price: req.body.price,
                            category: req.body.category,
                            image: {
                                data: req.file.filename,
                                contentType: 'image/png, image/jpeg'
                            }
                        })
                        product.save()
                            .then(() => res.send('Image Upload was a success')).catch(err => { console.log(err) })
                    }
                }

            )
            // const product = new Products({
            //     name: req.body.name,
            //     price: req.body.price,
            //     category: req.body.category,
            //     image: {
            //         data: req.body.filename,
            //         contentType: 'image/png, image/jpeg'
            //     }

        // })
        // try {
        //     const newProduct = await product.save()
        //     res.status(201).json(newProduct)
        // } catch (err) {
        //     res.status(400).json({ message: err.message })

        // }
    })
    //Updating One Resource
router.patch('/:id', getProduct, async(req, res) => {
        if (req.body.name != null) {
            res.product.name = req.body.name
        }
        if (req.body.price != null) {
            res.product.price = req.body.price
        }
        if (req.body.category != null) {
            res.product.category = req.body.category
        }
        try {
            const updatedProduct = await res.product.save()
            res.json(updatedProduct)

        } catch (err) {
            res.status(400).json({ message: err.message })
        }

    })
    //Deleting One
router.delete('/:id', getProduct, async(req, res) => {
    try {
        await res.product.remove(req.params.id);
        res.json({ message: 'Successfully Deleted Product' })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

async function getProduct(req, res, next) {
    let product
    try {
        product = await Products.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' })
        }
    } catch (err) {

        return res.status(500).json({ message: err.message })
    }
    res.product = product
    next()
}

module.exports = router;