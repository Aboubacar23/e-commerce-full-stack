const Product = require('../models/Product');
const fs = require('fs');

//la liste des produits 
exports.getAllProducts  = (req, res , next) => {
    Product.find()
        .then(produts => res.status(200).json(produts))
        .catch(error => res.status(400).json({ error }));
}

//lire un seul produit
exports.getByIdProduct = (req, res, next) =>{
    Product.findOne({ _id : req.params.id})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(400).json({ error}))
}

//ajouter un produit
exports.newProduct = (req, res, next ) => {
    if(!req.file)
    {
        delete req.body._id;
        const product = new Product({
            ...req.body,
        });
    
        product.save()
            .then(() => res.status(201).json({ message : 'Produit crée avec succès !'}))
            .catch(error => res.status(400).json({ error }));

    }
    else
    {
        delete req.body._id;
        const product = new Product({
            ...req.body,
            image : `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`
        });
    
        product.save()
            .then(() => res.status(201).json({ message : 'Produit crée avec succès !'}))
            .catch(error => res.status(400).json({ error }));
    }
}

//la méthode update avec image
 exports.updateProduct = (req, res, next) => {

      const productObject = req.file ? {
          ...JSON.parse(req.body),
         image: `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`
     } : { ...req.body };

     Product.updateOne({ _id: req.params.id }, {...productObject, _id: req.params.id })
         .then(() => res.status(200).json({ message: 'Product modifié !' }))
         .catch(error => res.status(400).json({ error }));
  };

//  exports.updateProduct = (req, res)=>{
//     const id = req.params.id;
//     var product = JSON.parse(req.body.product);
//     //console.log(product);
//     if(req.file){
//         product.image = `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`;
//         Product.findOne({_id: id},{image: true},(err, product)=>{
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             const filename = product.image.split('/products/')[1];
//             fs.unlink(`public/images/products/${filename}`, (err)=>{
//                 if(err){
//                     console.log(err.message);
//                 }
//             }); 
//         })
//     }

//     Product.updateOne({_id: id}, {...product, _id: id}, (err, data)=>{
//         if(err){
//             return res.status(500).json({
//                 status: 500,
//                 message: 'Error when updating Product',
//                 error: err
//             })
//         }

//         return res.status(200).json({
//             status: 200,
//             message: 'Product Updated !'
//         })
//     })
// },

exports.deleteOneProduct = (req, res, next) => {
    Product.findOne({ _id : req.params.id })
        .then(product => {
            const filename = product.image.split('/products')[1];
            fs.unlink(`public/images/products/${filename}`, () => 
            {
            Product.deleteOne({_id : req.params.id })
            .then(() => res.status(200).json({ message : 'Produit a été supprimer'}))
            .catch(error => res.status(400).json({ error}))            
            })  
        })
        .catch(error  => res.status(500).json({ error }))
}
