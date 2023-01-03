module.exports = (server) => {
const userController = require("../controllers/userController");

/**
 *
 * @openapi
 * paths:
 *  /user/register:
 *   post:
 *     tags:
 *       - User
 *     description: Permet d'enregistrer un nouvel utilisateur 
 *     parameters:
 *       - in: query
 *         name: email
 *         description: email de l'utilisateur
 *       - in: query
 *         name: pseudo
 *         description: pseudo de l'utilisateur
 *       - in: query
 *         name: password
 *         description: mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Retour les informations de l'utilisateur.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.post("/user/register", userController.userRegister);

/**
 *
 * @openapi
 * paths:
 *  /user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Permet de se connecter en tant qu'utilisateur
 *     parameters:
 *       - in: query
 *         name: email
 *         description: email de l'utilisateur
 *       - in: query
 *         name: password
 *         description: mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Retour les informations de l'utilisateur ainsi que le token.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.post("/user/login", userController.loginRegister);


/**
 *
 * @openapi
 * paths:
 *  /user:
 *   get:
 *     tags:
 *       - User
 *     description: Recherche un utilisateur en fonction de son email
 *     parameters:
 *       - in: query
 *         name: email
 *         description: email de l'utilisateur
 *     responses:
 *       200:
 *         description: Retour les informations de l'utilisateur.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/user")
.get(userController.findUserByEmail);
}