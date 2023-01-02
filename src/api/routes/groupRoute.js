module.exports = (server) => {
    const groupController = require("../controllers/groupController");


server.route("/group")
.get(groupController.listAllGroups);

server.route("/group/:idUserAdmin")
.post(groupController.createAGroup);

server.route("/group/:userId")
.get(groupController.listGroupsByUser);

server.route("/addUser")
.post(groupController.addUserIntoGroup);

server.route("/removeUser")
.delete(groupController.removeUserOfGroup);

server.route("/group/:idGroup")
.put(groupController.updateGroup)
.delete(groupController.removeGroup);

}