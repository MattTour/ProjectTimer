const Group = require("../models/groupModel");

exports.listAllGroups = (req, res) => {
    Group.find({}, (error, groups) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        } else {
            res.status(200);
            res.json(groups);
        }
    })
}

exports.createAGroup = (req, res) => {
    let newGroup = new Group({
        idUserAdmin: req.params.idUserAdmin,
        groupName: req.body.groupName
    });
    newGroup.save((error, group) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        } else {
            res.status(201);
            res.json({
                "idUserAdmin": group.idUserAdmin,
                "groupName": group.groupName
            })
        }
    })
}

//http://localhost:3000/groups/63a8708996db296923360c01
exports.getOneGroup = (req, res) => {
    Group.findById(req.params.idGroup, (error, group) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json(group);
        }

    })
}

//http://localhost:3000/groups/63a8708996db296923360c01
exports.updateGroup = (req, res) => {
    Group.find({_id: req.params.idGroup}, (error, group) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur, groupe inconnu." });
        } else {
            Group.findByIdAndUpdate(req.params.idGroup, req.body, { 
                groupName: req.body.groupName}, (error, group) => {
                if (error) {
                    res.status(401);
                    console.log(error);
                    res.json({ message: "Reqûete invalide." });
                }
                else {
                    res.status(200);
                    res.json({ message: "Le groupe à bien été modifié."});
                }
            })
        }
    })    
}

//http://localhost:3000/groups/63a8708996db296923360c01
exports.removeGroup = (req, res) => {
    Group.find({_id: req.params.idGroup}, (error, group) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur, groupe inconnu." });
        } else {
            Group.findByIdAndRemove(req.params.idGroup, (error) => {
                if (error) {
                    res.status(401);
                    console.log(error);
                    res.json({ message: "Reqûete invalide." });
                }
                else {
                    res.status(200);
                    res.json({message: "Groupe supprimé"});
                }
            })
        }
    })    
}
