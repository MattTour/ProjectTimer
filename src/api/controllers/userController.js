const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userRegister = async (req, res) => {

    try {
        const { email, password, pseudo } = req.body;
        console.log(req.body);
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        if (
            email === '' || typeof email === 'undefined' ||
            password === '' || typeof password === 'undefined' ||
            pseudo === '' || typeof pseudo === 'undefined'
        ) {
            let error = "Les champs obligatoires n\'ont pas ete renseignées. ";
            console.log(error);
            return res.status(500).json(error);
        }
        const user = await User.create({
            email,
            password: hash,
            pseudo
        })
        console.log(user);
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.findUserByEmail = (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
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

exports.loginRegister = (req, res) => {
    // Find user
    User.findOne({ email: req.body.email }, (error, user) => {
        // If user not found
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Utilisateur non trouvé" });
        }
        else {
            // User found
            if (
                user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
                // Password correct
                let userData = {
                    id: user._id,
                    email: user.email,
                    role: "admin"
                }
                jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30 days" }, (error, token) => {
                    if (error) {
                        res.status(500);
                        console.log(error);
                        res.json({ message: "Impossible de générer le token" });
                    }
                    else {
                        res.status(200);
                        console.log([JSON.stringify(token), JSON.stringify(userData.id)]);

                        res.send([JSON.stringify(token), JSON.stringify(userData.id)]);
                    }
                })
            }
            else {
                // Password don't match
                res.status(401);
                console.log(error);
                res.json({ message: "Email ou Mot de passe incorrect" });
            }
        }
    })
}