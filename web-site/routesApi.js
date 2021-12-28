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
}