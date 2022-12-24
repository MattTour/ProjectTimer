module.exports = (server) => {
    const projectController = require("../controllers/projectController");

server.route("/project")
.get(projectController.listAllProjects)
.post(projectController.createAProject);

server.route("/project/:project_id")
.get(projectController.getAProject)
.put(projectController.updateAProject)
.delete(projectController.deleteAProject);

}