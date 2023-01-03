module.exports = (server) => {
    const groupController = require("../controllers/groupController");


/**
 *
 * @openapi
 * paths:
 *  /group:
 *   get:
 *     tags:
 *       - Group
 *     description: Retourne l'ensemble des groups présent en base
 *     responses:
 *       200:
 *         description: Retour l'ensemble des groupes présent en base.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/group")
.get(groupController.listAllGroups);


/**
 *
 * @openapi
 * paths:
 *  /group/{idUserAdmin}:
 *   post:
 *     tags:
 *       - Group
 *     description: Créée un group avec comme admin l'utilisateur
 *     parameters:
 *       - in: path
 *         name: idUserAdmin
 *         description: id de l'utilisateur créant le group
 *     responses:
 *       200:
 *         description: Message confirmant que le groupe à bien été créé.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/group/:idUserAdmin")
.post(groupController.createAGroup);


/**
 *
 * @openapi
 * paths:
 *  /group/{userId}:
 *   get:
 *     tags:
 *       - Group
 *     description: Retourne l'ensemble des groupes liées à un utilisateur
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: id de l'utilisateur
 *     responses:
 *       200:
 *         description: Retourne les groupes liés à un utilisateur.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/group/:userId")
.get(groupController.listGroupsByUser);


/**
 *
 * @openapi
 * paths:
 *  /addUser:
 *   post:
 *     tags:
 *       - Group
 *     description: Ajoute un utilisateur dans un groupe existant
 *     parameters:
 *       - in: query
 *         name: email
 *         description: email de l'utilisateur
 *       - in: query
 *         name: groupId
 *         description: id du groupe auquel on ajoute l'utilisateur
 *     responses:
 *       200:
 *         description: Message confirmant que le groupe à bien été modifié.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/addUser")
.post(groupController.addUserIntoGroup);


/**
 *
 * @openapi
 * paths:
 *  /removeUser:
 *   delete:
 *     tags:
 *       - Group
 *     description: Permet de supprimer l'utilisateur d'un groupe
 *     parameters:
 *       - in: query
 *         name: email
 *         description: email de l'utilisateur
 *       - in: query
 *         name: groupId
 *         description: id du groupe
 *     responses:
 *       200:
 *         description: Message confirmant que l'utilisateur à bien été supprimé du groupe.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/removeUser")
.delete(groupController.removeUserOfGroup);



server.route("/group/:idGroup")
/**
 *
 * @openapi
 * paths:
 *  /group/{idGroup}:
 *   put:
 *     tags:
 *       - Group
 *     description: Modifie les informations d'un groupe
 *     parameters:
 *       - in: path
 *         name: groupId
 *         description: id du groupe concerné
 *       - in: query
 *         name: groupName
 *         description: nouveau nom du groupe
 *     responses:
 *       200:
 *         description: Message confirmant que le groupe à bien été modifié.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.put(groupController.updateGroup)

/**
 *
 * @openapi
 * paths:
 *  /group/{idGroup}:
 *   delete:
 *     tags:
 *       - Group
 *     description: Permet de supprimer un groupe existant 
 *     parameters:
 *       - in: path
 *         name: groupId
 *         description: id du groupe à supprimer
 *     responses:
 *       200:
 *         description: Message confirmant que le groupe à bien été supprimé.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.delete(groupController.removeGroup);

}