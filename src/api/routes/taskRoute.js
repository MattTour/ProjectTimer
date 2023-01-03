module.exports = (server) => {
    const taskController = require("../controllers/taskController");

server.route("/task")
.post(taskController.createATask);

server.route("/task/:idTask")
.get(taskController.getATask)
.put(taskController.updateATask)
.delete(taskController.deleteATask);

server.route("/endTask/:idTask")
.put(taskController.endATask)

server.route("/tasks/:idProject")
.get(taskController.findTasksByProjectId);
}

