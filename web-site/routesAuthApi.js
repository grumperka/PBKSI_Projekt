const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";


module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post("/findUserApi", (req, resp) => {

        var mail = req.body.email;
        console.log('/findUserApi');

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            var dbo = db.db("mydb");
            dbo.collection("users").find({ email: mail }, { email: 1, pswd: 1 }).toArray(function (err, result) {
                if (err) return resp.json({ data: "ERROR" });

                if (!result.length) {
                    console.log("Nie znaleziono uzytkownika!!!");
                    resp.json({ odp: ["ERROR"] });
                } else {
                    console.log("Znaleziono uzytkownika!");
                    resp.json({ odp: result });
                }

                resp.end();
                db.close();
            });
        });
    });

    app.post("/registerUserApi", (req, resp) => {

        var mail = req.body.email;
        var password = req.body.pswd;
        console.log('/registerUserApi');

        var zmienna = {
            email: mail,
            pswd: password
        };

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            var dbo = db.db("mydb");
            dbo.collection("users").insertOne(zmienna, function (err, res) {
                if (err) return res.send(err);

                console.log("Dodano nowego usera");

                resp.json("OK");
                resp.end();
                db.close();
            });

        });
    });

    app.post("/loginToApi", (req, response) => {

        const mail = req.body.email;

        const zmienna = {
            email: mail
        };
        console.log('/loginToApi');

        fetch('http://localhost:8080/findUserApi', {
            method: 'POST',
            body: JSON.stringify(zmienna),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp =>
                resp.json()
            )
            .then(resp => {
                console.log('ODP: ' + JSON.stringify(resp.odp[0]));
                const user = resp.odp[0];
                const password = req.body.pswd;
                console.log('ODD: ' + password);

                if (resp.odp[0] == "ERROR") {
                    response.json({ data: "ERROR" });
                } else {

                    if (typeof user !== 'undefined' && typeof password !== 'undefined') {
                        let bool = compareHASH(user.pswd, password);

                        if (bool == true) {
                            response.json({ data: user });
                        }
                        else {
                            response.json({ data: "ERROR" });
                        }
                        response.end();

                    } else {
                        response.json({ data: "ERROR" });
                        response.end();
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });



    });


    app.post("/registerToApi", (req, response) => {

        const mail = req.body.email;

        const zmienna = {
            email: mail
        };
        console.log('/registerToApi');

        fetch('http://localhost:8080/findUserApi', {
            method: 'POST',
            body: JSON.stringify(zmienna),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp =>
                resp.json()
            )
            .then(resp => {
                console.log('ODP: ' + JSON.stringify(resp.odp[0]));
                const user = resp.odp[0];
                const mail = req.body.email;
                const password = req.body.pswd;
                console.log('ODD: ' + password + ' i ' + mail);

                if (resp.odp[0] != "ERROR") {
                    response.json({ data: "ERROR" });
                } else {

                    if (typeof mail !== 'undefined' && typeof password !== 'undefined') {
                        let hash = makeHASH(password);
                        console.log('HASH: ' + hash);

                        const user = {
                            email: mail,
                            pswd: hash
                        };

                        fetch('http://localhost:8080/registerUserApi', {
                            method: 'POST',
                            body: JSON.stringify(user),
                            headers: { 'Content-Type': 'application/json' }
                        })
                            .then(res => res.json())
                            .then(res => {
                                console.log(res);

                                response.json({ data: user });
                                response.end();
                            })
                            .catch(error => {
                                console.log(error);
                            });



                    } else {
                        response.json({ data: "ERROR" });
                        response.end();
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });



    });
}

function compareHASH(hash, text) {
    let results = bcrypt.compareSync(text, hash);
    return results;
}

function makeHASH(text) {
    let results = bcrypt.hashSync(text, 10);
    return results;
}