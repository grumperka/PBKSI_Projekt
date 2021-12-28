var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";

module.exports = function (app) {
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

            dbo.collection("potrawy").find(ObjectId(id1)).toArray(function (err, result) {              
                if (err) throw err;

                res.json(result);
                db.close();
            });
        });
    });
    
}