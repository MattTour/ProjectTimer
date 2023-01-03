const Task = require('../models/taskModel');


//ex: http://localhost:3000/tasks/63b048f6fc1cbb1aba68607e
exports.findTasksByProjectId = (req, res) => {
    Task.find({ idProject: req.params.idProject }, (error, tasks) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        } else {
            res.status(200);
            res.json(tasks);
        }
    })
}

//BESOIN D'AVOIR UNE CLÉ ID DANS LE REQ.PARAMS
//ex: http://localhost:3000/task/?id=63a37531f3f3cc589ef908e0
exports.getATask = (req, res) => {
    Task.findById(req.params.idTask), (error, task) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        } else {
            res.status(200);
            res.json(task)
        }
    }
}

exports.createATask = (req, res) => {
    let newTask = new Task(req.body);
    newTask.save((error, task) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Requete invalide." });
        } else {
            res.status(201);
            res.json(task)
        }
    })
}

//http://localhost:3000/task/63a37531f3f3cc589ef908e0
//Attention, pas de clé "id" ici
exports.updateATask = (req, res) => {
    if (
        req.body.taskName === "" || typeof req.body.taskName === "undefined"
    ) {
        let error = 'Le champ taskName n\'est pas renseignée !';
        console.log(error);
        return res.status(500).json(error);
    }
    Task.findByIdAndUpdate(req.params.idTask, req.body, { 
        taskName: req.body.taskName,
        description: req.body.description }, (error, task) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({ message: "La tâche a bien été modifiée.", idProject: task.idProject});
        }

    })
}

exports.endATask = (req, res) => {
    let endDate = Date.now();
    Task.findByIdAndUpdate(req.params.idTask, { 
        endDate: endDate
        }, (error, task) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({ message: "La tâche est bien cloturée."});
        }

    })
}


//http://localhost:3000/task/63a37531f3f3cc589ef908e0
////Attention, pas de clé "id" ici
exports.deleteATask = (req, res) => {
    Task.findByIdAndRemove(req.params.idTask, (error) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({message: "Tâche supprimé"});
        }

    })
}