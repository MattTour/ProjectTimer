module.exports = (server) => {
    const groupController = require("../controllers/groupController");


server.route("/group")
.get(groupController.listAllGroups);

server.route("/group/:idUserAdmin")
.post(groupController.createAGroup);

server.route("/group/:idGroup")
.get(groupController.getOneGroup)
.put(groupController.updateGroup)
.delete(groupController.removeGroup);

}