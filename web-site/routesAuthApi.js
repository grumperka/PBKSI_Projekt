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
        var password = req.body.pswd;
        console.log('/findUserApi');

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            var dbo = db.db("mydb");
            dbo.collection("users").find({ email: mail }, { email: 1, pswd: 1 }).toArray(function (err, result) {
                if (err) return resp.json(err);

                console.log("Znaleziono uzytkownika!");
                resp.json({ odp: result });
                resp.end();
                db.close();
            });
        });
    });

    app.post("/loginToApi", (req, response) => {

        const mail = req.body.email;
        const password = req.body.pswd;

        const zmienna = {
            email: mail,
            pswd: password
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

                if (typeof user !== 'undefined' && typeof password !== 'undefined') {
                    let bool = compareHASH(user.pswd, password);

                    if (bool == true) {
                        response.json({ data: user });
                    }
                    else {
                        response.json({ data: "ERROR"});
                    }
                    response.end();
                }
            })
            .catch(error => {
                console.log(error);
            });

            

    });



}

function compareHASH(hash, text) {
    console.log('METHOD');

    let results = bcrypt.compareSync(text, hash);
    console.log('Czy to samo? ' + results);

    return results;
}