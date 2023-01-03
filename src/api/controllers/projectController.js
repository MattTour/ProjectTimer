const Project = require('../models/projectModel');

exports.listAllProjects = (req, res) => {
    Project.find({}, (error, project) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(project);
        }
    })
}

exports.createAProject = (req, res) => {
    let newProject = new Project(req.body);
    newProject.save((error, project) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(201);
            res.json({
                "projectname": project.projectName,
                "description": project.description,
                "group_id": project.group_id
            });
        }
    })

}

exports.findProjecstByGroupId = (req, res) => {
    Project.find({group_id: req.params.group_id}, (error, projects) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        } else {
            res.status(200);
            res.json(projects)
        }
    })
}

exports.getAProject = (req, res) => {
    Project.findById(req.params.project_id, (error, project) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json(project);
        }

    })
}

exports.updateAProject = (req, res) => {
    if (
        req.body.projectName === "" || typeof req.body.projectName === "undefined"
    ) {
        let error = 'Le champ ProjectName n\'est pas renseignée !';
        console.log(error);
        return res.status(500).json(error);
    }
    Project.findByIdAndUpdate(req.params.project_id, req.body, { 
        projectName: req.body.projectName, 
        description: req.body.description }, (error, project) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({ message: "Le project à bien été modifié.", idGroup: project.group_id});
        }

    })
}

exports.deleteAProject = (req, res) => {
    Project.findByIdAndRemove(req.params.project_id, (error) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({message: "Projet supprimé"});
        }

    })
}