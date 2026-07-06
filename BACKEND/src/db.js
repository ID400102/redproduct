const {connect} = require("mongoose")

function dbConnexion () {
    connect("mongodb+srv://idiallo19035_db_user:Rosine04.@ivo400102.0wmxark.mongodb.net/redproduct?appName=ivo400102/authentication")
    .then(() => console.log("connexion MongoDB reussie"))
    .catch(error => console.log(error))
}

module.exports = dbConnexion