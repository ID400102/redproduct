const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./models")
const userValidation = require("./validation")

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.inscription = (req, res) => {

    // recuperer les donnees 
    const {body} = req
    // recuperer les donnees 
    const {error} = userValidation(body)
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
    res.send("connexion reussie")
}