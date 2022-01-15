const bodyParser = require('body-parser');
const express = require('express');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";



module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    require("dotenv").config();

    app.post("/generateAccessTokenApi", (req, resp) => {
        var id = req.body._id;
        var mail = req.body.email;
        var password = req.body.pswd;
        console.log('/generateAccessTokenApi');

        var user = { 
            id: id,
            email: mail,
            pswd: password
        };

        console.log('USER: ' + user.id);

        const accessToken = generateAccessToken(user, '15s');
        const refreshToken = generateRefreshToken(user, '3h');

        saveRefreshTokenApi(user.id,refreshToken);

        resp.json({ accessToken: accessToken });
        resp.end();
    });

    app.post("/getAccessTokenApi", async (req, resp) => {
        const authHeader = req.headers['authorization'];

        console.log("getAccessTokenApi");
        console.log("Auth: " + authHeader);

        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) { console.log("WESZLO PRZEZ ERROR"); return resp.json('ERROR'); }

        console.log("TOK after: " + token);

        var id0;
        var email0;
        var token0;

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                resp.json({ data: "ERROR" });
                resp.end();
            } else {
                id0 = user.id;
                email0 = user.email;
                
                /*znajdz token refresh z bd */


                let zmienna = {
                    id: id0,
                    email: email0
                }
                resp.json({ data: zmienna });
                resp.end();
            }

        });
    });


    app.post("/refreshAccessTokenApi", async (req, resp) => {
        const authHeader = req.headers['authorization'];

        console.log("-----------------------refreshAccessTokenApi");
        console.log("-----------------------Auth: " + authHeader);

        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) { console.log("WESZLO PRZEZ ERROR"); return resp.json('ERROR'); }

        console.log("-----------------------TOK after: " + token);

        var id0;
        var email0;

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                resp.json({ data: "ERROR" });
                resp.end();
            } else {
                id0 = user.id;
                email0 = user.email;
                password0 = user.password

                let zmienna = {
                    id: id0,
                    email: email0,
                    pswd: password0
                }

                const accessToken = generateAccessToken(zmienna, '30s');

                resp.json({ accessToken: accessToken });
                resp.end();
            }

        });
    });
}

function generateAccessToken(user, time) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time });
}

function generateRefreshToken(user, time) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: time });
}

function saveRefreshTokenApi(id, refreshToken) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var ObjectId = require('mongodb').ObjectID;

        var dbo = db.db("mydb");

        dbo.collection("users").updateMany({_id: ObjectId(id)}, 
        {
            $set: { refreshToken: refreshToken }
        }, (err, result) => {
            if (err) console.log(err);

            console.log(result);
        });
       
    });

}