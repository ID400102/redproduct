const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("./models");
const userValidation = require("./validation")

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.inscription = (req, res) => {

    // recuperer les donnees 
    const {body} = req
    // valider les donnees 
    const {error} = userValidation(body).userValidationSignUp
    if(error) return res.status(401).json(error.details[0].message)
    
    // hash du mot de passe
    bcrypt.hash(body.password, 10)
    .then(hash => {
        if(!hash) res.status(500).json({msg : "server error"})
        
        delete body.password
        new User({...body, password : hash})
        .save()
        .then((user) => {
            console.log(user);
            res.status(201).json({msg : "enregistrement de l'utilisateur reussi"})
        })
        .catch((error) => res.status(500).json(error))
    })
    .catch((error) => res.status(500).json(error))
    
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.connexion = (req, res) => {
    const {email, password} = req.body 
    // validation des donnees

    const {error} = userValidation(req.body).userValidationLogin
    if(error) return res.status(401).json(error.details[0].message)
    // console.log(req.body);
    
    // trouver les users dans la base de donnees
    user.findOne({email : email})
    .then(user => {
        if(!user) return res.status(404).json({msg : "L'utilisateur n'a pas ete retrouve"})
        
        // verification du mot de passe
        bcrypt.compare(password, user.password)
        .then(match => {
            if(!match) return res.status(500).json({msg : "erreur serveur"})
                res.status(200).json({
                    email : user.email,
                    id : user._id,
                    token : jwt.sign({id : user._id}, "Secret_KEY", {expiresIn : "12h"})
            })
            
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error))

}