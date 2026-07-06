const express = require("express");


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.inscription = (req, res) => {
    res.send("inscription reussie")
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.connexion = (req, res) => {
    res.send("connexion reussie")
}