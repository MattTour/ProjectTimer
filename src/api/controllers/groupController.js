const Group = require("../models/groupModel");
const User = require("../models/userModel");

exports.listAllGroups = (req, res) => {
    Group.find({}, (error, groups) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        } else {
            res.status(200);
            res.json(groups);
        }
    })
}

exports.listGroupsByUser = (req, res) => {
    User.findById(req.params.userId).populate("groups").exec(function (error, user) {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur" });
        }
        else {
            res.status(200);
            res.json(user);
        }
    })
}

exports.createAGroup = (req, res) => {
    // Creation du nouveau group
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
            // console.log(req.params.idUserAdmin);
            // Recherche admin user
            User.findById(req.params.idUserAdmin, (error, user) => {
                console.log(user);
                let groupsExist = user.groups
                groupsExist.push(group._id);
                console.log(groupsExist);

                User.findByIdAndUpdate(req.params.idUserAdmin, { groups: groupsExist })
                    .then(result => console.log(result))
                    .catch((error) => console.log('error : ', error))

            })

        }
        res.status(200);
        res.json({message : "Le groupe à bien été créée."})
    })
}

exports.addUserIntoGroup = (req, res) => {
    User.findOne({ email: req.body.email}, (error, user) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        listGroups = user.groups;
        listGroups.push(req.body.groupId);
        User.findByIdAndUpdate(user._id, {
            groups: listGroups
        }, (error) => {
            if (error) {
                res.status(401);
                console.log(error);
                res.json({ message: "Reqûete invalide." });
            }
            else {
                res.status(200);
                res.json({ message: "Le groupe à bien été modifié." });
            }
        })
    })
}

exports.removeUserOfGroup = (req, res) => {
    User.findOne({ email: req.body.email}, (error, user) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        listGroups = user.groups;
        //recherche de l'index en fonction du groupId dans l'ensemble des groupes liées à l'utilisateur
        let index = listGroups.indexOf(req.body.groupId);
        //Supprime l'élement
        listGroups.splice(index, 1);
        //Update de l'utilisateur
        User.findByIdAndUpdate(user._id, {
            groups: listGroups
        }, (error) => {
            if (error) {
                res.status(401);
                console.log(error);
                res.json({ message: "Reqûete invalide." });
            }
            else {
                res.status(200);
                res.json({ message: "Le groupe à bien été supprimé." });
            }
        })
    })
}

//http://localhost:3000/groups/63a8708996db296923360c01
exports.updateGroup = (req, res) => {
    if (
        req.body.groupName === "" || typeof req.body.groupName === "undefined"
    ) {
        let error = 'Le champ groupName n\'est pas renseignée !';
        console.log(error);
        return res.status(500).json(error);
    }
    Group.findByIdAndUpdate(req.params.idGroup, req.body, {
        groupName: req.body.groupName
    }, (error) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({ message: "Le groupe à bien été modifié." });
        }
    })
}

//http://localhost:3000/groups/63a8708996db296923360c01
exports.removeGroup = (req, res) => {
    Group.find({ _id: req.params.idGroup }, (error, group) => {
        if (error) {
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
                    res.json({ message: "Groupe supprimé" });
                }
            })
        }
    })
}
