module.exports = (server) => {
    const taskController = require("../controllers/taskController");

server.route("/task")
.post(taskController.createATask)
.get(taskController.testTask);

server.route("/task/:idTask")
.get(taskController.getATask)
.put(taskController.updateATask)
.delete(taskController.deleteATask);

server.route("/task/:idProject")
.get(taskController.listAllTasks);
}

