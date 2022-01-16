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
                if (err) return res.send(err);

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
                if (err) return res.send(err);

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
                if (err) return res.send(err);

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
                if (err) return res.send(err);

                res.json(result);
                db.close();
            });
        });
    });

    app.route("/addPotrawyApi").post(function (req, resp) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;


            var zmienna =
            {
                nazwa: req.body.nazwa,
                cena: req.body.cena,
                info: req.body.info,
                kategoria: req.body.kategoria,
                status: req.body.status
            };

            var dbo = db.db("mydb");
            dbo.collection("potrawy").insertOne(zmienna, function (err, res) {
                if (err) return res.send(err);

                console.log("Dodano nowa potrawe!");

                resp.json(zmienna);
                resp.end();
                db.close();
            });

        });
    });

    app.route('/deletePotrawyApi/:id').get(function (req, resp) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            console.log("API");
            var ObjectId = require('mongodb').ObjectID;
            var id1 = { _id: ObjectId(req.params.id) };

            dbo.collection("potrawy").deleteOne(id1, function (err, res) {
                if (err) return res.send(err);

                console.log("Usunieto potrawe!");

                resp.json("OK");
                resp.end();
                db.close();
            });
        });
    });

    app.route("/editPotrawyApi").post(function (req, resp) { /*cos nie tak! */
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            var ObjectId = require('mongodb').ObjectID;

            var zmienna =
            {
                id: req.body.id,
                nazwa: req.body.nazwa,
                cena: req.body.cena,
                info: req.body.info,
                kategoria: req.body.kategoria,
                status: req.body.status
            };

            var dbo = db.db("mydb");

            dbo.collection("potrawy").updateMany({
                _id: ObjectId(zmienna.id)
            }, {
                $set: {
                    nazwa: zmienna.nazwa,
                    cena: zmienna.cena,
                    info: zmienna.info,
                    kategoria: zmienna.kategoria,
                    status: zmienna.status
                }
            }, (err, result) => {
                if (err) return resp.send(err);

                resp.json("OK");
                resp.end();
                db.close();
            });
        });
    });

}

