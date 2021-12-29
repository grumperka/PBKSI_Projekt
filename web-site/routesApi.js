const bodyParser = require('body-parser');
const express = require('express');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";



module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.route("/allPotrawyApi").get(function (req, res) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            var dbo = db.db("mydb");
            dbo.collection("potrawy").find({}, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
                if (err) throw err;

                res.json(result);
                db.close();
            });
        });
    });

    app.route("/allCategoryApi/:category").get(function (req, res) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            var dbo = db.db("mydb");
            dbo.collection("potrawy").find({ kategoria: req.params.category }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
                if (err) throw err;

                res.json(result);
                db.close();
            });
        });
    });

    app.route("/allStatusApi/:status").get(function (req, res) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            var dbo = db.db("mydb");
            dbo.collection("potrawy").find({ status: req.params.status }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
                if (err) throw err;

                res.json(result);
                db.close();
            });
        });
    });


    app.route("/potrawaApi/:id").get(function (req, res) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var id1 = req.params.id;
            var dbo = db.db("mydb");
            var ObjectId = require('mongodb').ObjectID;
            var id1 = req.params.id;
            console.log(id1);

            var dbo = db.db("mydb");
            dbo.collection("potrawy").find(ObjectId(id1)).toArray(function (err, result) {
                if (err) throw err;

                res.json(result);
                db.close();
            });
        });
    });

    app.route("/potrawyApi").post(function (req, resp) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            console.log(req.body.nazwa);

            var zmienna =
            {
                    nazwa: req.body.nazwa,
                    cena: req.body.cena,
                    info: req.body.info,
                    kategoria: req.body.kategoria,
                    status: req.body.status
            };

            app.result.push(zmienna);

            var dbo = db.db("mydb");
            dbo.collection("potrawy").insertOne(zmienna, function (err, res) {
                    if (err) throw err;
                    console.log("Dodano nowa potrawe!");

                    resp.json("OK");
                    resp.end();
                    db.close();
                });
            
        });
    });

    savePotrawa = function (potrawa){
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            console.log("API");
    
            if(potrawa == null){
                console.log(potrawa);
            
            
    
            app.result.push(potrawa);
    
                dbo.collection("potrawy").insertOne(potrawa, function (err, res) {
                    if (err) throw err;
                    console.log("Dodano nowa potrawe!");
                    db.close();
                });
            } else {console.log("NULL");}
        });
    }
}

