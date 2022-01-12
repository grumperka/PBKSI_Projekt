const bodyParser = require('body-parser');
const express = require('express');
var jwt = require('jsonwebtoken');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";

let refreshTokenList = [];


module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(express.json());
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

        const accessToken = generateAccessToken(user,'15s');
        const refreshToken = generateRefreshToken(user);
        refreshTokenList.push(refreshToken);

        resp.json({ accessToken: accessToken, refreshToken: refreshToken });
        resp.end();
    });

    app.post("/getAccessTokenApi", (req, resp) => {
        const authHeader = req.headers['authorization'];
        
        console.log("getAccessTokenApi");
        console.log("H: " + authHeader);

        var id = req.body._id;
        var mail = req.body.email;
        var password = req.body.pswd;

        const user = {
            id: id,
            email: mail,
            pswd: password
        }

        console.log("H_Mail: " + user.mail);

        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return resp.json('ERROR');

        let response = verifyAccessToken(token);
        if(response != "ERROR") 
        {
            console.log("ERR AC");
            resp.json({ data: "ERROR"});
        }
        else {
            resp.json({ data: user });
            console.log("ACC AC");
        }

        resp.end();
    });



}

function generateAccessToken(user,time){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time });
}

function generateRefreshToken(user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

function verifyAccessToken(token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return "ERROR";

      return user;
    });
}