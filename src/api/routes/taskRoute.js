module.exports = (server) => {
    const taskController = require("../controllers/taskController");

/**
 *
 * @openapi
 * paths:
 *  /task:
 *   post:
 *     tags:
 *       - Task
 *     description: Permet d'enregistrer une nouvelle tâche liée à un groupe existant
 *     parameters:
 *       - in: query
 *         name: idProject
 *         description: id du projet en relation
 *       - in: query
 *         name: taskName
 *         description: nom de la tâche
 *       - in: query
 *         name: description
 *         description: description de la tâche
 *     responses:
 *       200:
 *         description: Retourne les informations de la tâche créée.
 *       400: 
 *         description: Erreur dans la requête. 
 */    
server.route("/task")
.post(taskController.createATask);

server.route("/task/:idTask")
/**
 *
 * @openapi
 * paths:
 *  /task/{idTask}:
 *   get:
 *     tags:
 *       - Task
 *     description: Retourne les informations d'une tâche en fonction de son id
 *     parameters:
 *       - in: path
 *         name: idTask
 *         description: id de la tâche
 *     responses:
 *       200:
 *         description: Retour les informations de la tâche concerné.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.get(taskController.getATask)

/**
 *
 * @openapi
 * paths:
 *  /task/{idTask}:
 *   put:
 *     tags:
 *       - Task
 *     description: Permet de modifier une tâche existante
 *     parameters:
 *       - in: path
 *         name: idTask
 *         description: id de la tâche
 *     responses:
 *       200:
 *         description: Message confirmant que la tâche à bien été modifié.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.put(taskController.updateATask)

/**
 *
 * @openapi
 * paths:
 *  /task/{idTask}:
 *   delete:
 *     tags:
 *       - Task
 *     description: Permet de supprimer une tâche existante
 *     parameters:
 *       - in: path
 *         name: idTask
 *         description: id de la tâche à supprimer 
 *     responses:
 *       200:
 *         description: Message confirmant la suppression de la tâche.
 *       400: 
 *         description: Erreur dans la requête. 
 */
.delete(taskController.deleteATask);

/**
 *
 * @openapi
 * paths:
 *  /endTask/{idTask}:
 *   put:
 *     tags:
 *       - Task
 *     description: Permet de cloturer une tâche existante
 *     parameters:
 *       - in: path
 *         name: idTask
 *         description: id de la tâche
 *     responses:
 *       200:
 *         description: Message confirmant que la tâche est bien cloturé.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/endTask/:idTask")
.put(taskController.endATask)


/**
 *
 * @openapi
 * paths:
 *  /tasks/{idProject}:
 *   get:
 *     tags:
 *       - Task
 *     description: Permet de retourner l'ensemble des tâches liée à un projet
 *     parameters:
 *       - in: path
 *         name: idProject
 *         description: id du projet concerné
 *     responses:
 *       200:
 *         description: Retour la liste des tâche liée au projet.
 *       400: 
 *         description: Erreur dans la requête. 
 */
server.route("/tasks/:idProject")
.get(taskController.findTasksByProjectId);
}

