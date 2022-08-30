const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    signup : (req, res, next) =>{
        bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            }); 
 
            user.save()
                .then(()=> res.status(201).json({ status : 201, message: 'Utilisateur crée avec success !'}))
                .catch(error => res.status(400).json({ message : error.message }));
        })
        .catch(error => res.status(500).json({ status : 500, message : error.message })); 
    },

    login : (req, res, next) => {
        User.findOne({ email : req.body.email })
            .then(user => {
                if(!user){
                    return res.status(401).json({ error : 'Utilisateur non trouvé'});
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid){
                            return res.status(404).json({ error : 'Mot de passe incorrect ! '})
                        }
                        res.status(200).json({
                            userId : user._id,
                            username : user.username,
                            email : user.email,
                            tokon : jwt.sign(
                                {userId : user._id},
                                'MON_TOKEN_SECRET',
                                { expiresIn : '24h'})
                        })
                    })
                    .catch(error => res.status(500).json({ status : 500, message : error.message}))
            })
            .catch(error => res.status(500).json({ status : 500, message : error.message}))
    },

    getAllUsers : (req, res, next) =>{
        User.find()
            .then(produts => res.status(200).json(produts))
            .catch(error => res.status(400).json({ error }));
    }

} 