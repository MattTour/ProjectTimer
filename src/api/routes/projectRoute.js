module.exports = (server) => {
    const projectController = require("../controllers/projectController");

server.route("/project")

/**
 *
 * @openapi
 * paths:
 *  /project:
 *   get:
 *     tags:
 *       - Project
 *     description: Permet de recuperer l'ensemble des projets
 *     responses:
 *       200:
 *         description: Retour la liste de l'ensemble des projets.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.get(projectController.listAllProjects)

/**
 *
 * @openapi
 * paths:
 *  /project:
 *   post:
 *     tags:
 *       - Project
 *     description: Permet de créer un nouveau projet
 *     parameters:
 *       - in: query
 *         name: groupId
 *         description: id du groupe concerné par le projet
 *       - in: query
 *         name: projectName
 *         description: nom du nouveau projet
 *       - in: query
 *         name: description
 *         description: description du nouveau projet
 *     responses:
 *       200:
 *         description: Retour les informations du nouveau projet.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.post(projectController.createAProject);

/**
 *
 * @openapi
 * paths:
 *  /projects/{group_id}:
 *   get:
 *     tags:
 *       - Project
 *     description: Permet de retourner l'ensemble des projets liées à un groupe
 *     parameters:
 *       - in: path
 *         name: group_id
 *         description: id du groupe concerné
 *       - in: query
 *         name: pseudo
 *         description: pseudo de l'utilisateur
 *       - in: query
 *         name: password
 *         description: mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Retourne l'ensemble des projets en relation avec le groupe.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/projects/:group_id")
.get(projectController.findProjecstByGroupId);

server.route("/project/:project_id")
/**
 *
 * @openapi
 * paths:
 *  /project/{project_id}:
 *   get:
 *     tags:
 *       - Project
 *     description: Permet de recuperer les informations d'un projet à partir de son id
 *     parameters:
 *       - in: path
 *         name: project_id
 *         description: id du projet concerné
 *     responses:
 *       200:
 *         description: Retour les informations du projet concerné.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.get(projectController.getAProject)

/**
 *
 * @openapi
 * paths:
 *  /project/{project_id}:
 *   put:
 *     tags:
 *       - Project
 *     description: Permet de modifier les informations d'un projet
 *     parameters:
 *       - in: path
 *         name: project_id
 *         description: id du projet
 *       - in: query
 *         name: projectName
 *         description: Nouveau nom du projet
 *       - in: query
 *         name: description
 *         description: Nouvelle description du projet
 *     responses:
 *       200:
 *         description: Retour un message confirmant les modifications.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.put(projectController.updateAProject)

/**
 *
 * @openapi
 * paths:
 *  /project/{project_id}:
 *   delete:
 *     tags:
 *       - Project
 *     description: Permet de supprimer un projet existant
 *     parameters:
 *       - in: path
 *         name: project_id
 *         description: id du projet à supprimer
 *     responses:
 *       200:
 *         description: Message confirmant la suppression du project.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.delete(projectController.deleteAProject);
}