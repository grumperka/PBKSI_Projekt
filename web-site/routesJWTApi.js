const bodyParser = require('body-parser');
const express = require('express');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";

let refreshTokenList = [];


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

        console.log('RTL: ' + refreshTokenList.length);

        var user = {
            id: id,
            email: mail,
            pswd: password
        };

        console.log('USER: ' + user.id);

        const accessToken = generateAccessToken(user, '30s');
        const refreshToken = generateRefreshToken(user);
        refreshTokenList.push(refreshToken);

        resp.json({ accessToken: accessToken, refreshToken: refreshToken });
        resp.end();
    });

    app.post("/getAccessTokenApi", async (req, resp) => {
        console.log(req);
        const authHeader = req.headers['authorization'];

        console.log("getAccessTokenApi");
        console.log("Auth: " + authHeader);
        //console.log("H: " + req.body._id);

        //var accessToken = req.body.accessToken;

        // const user = {
        //     id: req.body._id,
        //     email: req.body.mail,
        //     pswd: req.body.pswd
        // }

        //console.log("USER: " + user.id);
        const token = authHeader && authHeader.split(' ')[1];
        console.log("TOK before: " + token);
        if (token == null) { console.log("WESZLO PRZEZ ERROR"); return resp.json('ERROR'); }

        console.log("TOK after: " + token);

        var id0;
        var email0;
        var pswd0;

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                resp.json({ data: "ERROR" });
                resp.end();
            } else {
                id0 = user.id;
                email0 = user.email;
                pswd0 = user.pswd;

                let zmienna = {
                    id: id0,
                    email: email0,
                    pswd: pswd0
                }
                resp.json({ data: zmienna });
                resp.end();
            }

        });


    });

}

function generateAccessToken(user, time) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}