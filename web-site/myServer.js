const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
var fs = require('fs');
var path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.result = [];
let routes = require("./routesApi.js");
routes(app);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";


app.use(session({ secret: 'ssshhhhh', saveUninitialized: false, resave: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.listen(8080, function () {
	console.log('Nasluchujemy z portu 8080')
});

app.get('/', (req, resp) => {
	axios.get('http://localhost:8080/allPotrawyApi')
		.then(response => {

			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('index.ejs', { potrawy: app.result, logged: true });
			}
			else
				resp.render('index.ejs', { potrawy: app.result, logged: false });

		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/przystawki', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ kategoria: "Przystawki" }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;
			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/zupy', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ kategoria: "Zupy" }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/salaty', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ kategoria: "Salaty" }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/makarony', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ kategoria: "Makarony" }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/miesa', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ kategoria: "Miesa" }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
			//if(err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/owoceMorza', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ kategoria: "Ryby i owoce morza" }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});


app.get('/desery', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ kategoria: "Desery" }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/dlaDzieci', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ kategoria: "Dla dzieci" }, { nazwa: 1, cena: 1, status: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/dostepne', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ status: "Dostepne" }, { nazwa: 1, cena: 1, kategoria: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/niedostepne', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ status: "Niedostepne" }, { nazwa: 1, cena: 1, kategoria: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/naZamowienie', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("potrawy").find({ status: "Na zamowienie" }, { nazwa: 1, cena: 1, kategoria: 1 }).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result);

			app.result = result;

			if (req.session.email) {
				resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });

			db.close();
		});
	});
});

app.get('/logOut', function (req, resp) {
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		} else {
			resp.redirect('/');
		}
	});
});

/*  */
app.get('/login.html', (req, resp) => {
	resp.sendFile(path.join(__dirname + '/views/login.html'));
});
/*  */

app.post('/potrawy', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		if (req.session.email) {

			var dbo = db.db("mydb");
			var zmienna =
			{
				nazwa: req.body.nazwa,
				cena: req.body.cena,
				info: req.body.info,
				kategoria: req.body.kategoria,
				status: req.body.status
			};

			app.result.push(zmienna);

			dbo.collection("potrawy").insertOne(zmienna, function (err, res) {
				if (err) throw err;
				console.log("Dodano nowa potrawe!");

				if (req.session.email) {
					resp.render('index.ejs', { potrawy: app.result, logged: true });
				}
				else resp.render('index.ejs', { potrawy: app.result, logged: false });

				resp.end();
				db.close();
			});

		} else {
			resp.sendFile(path.join(__dirname + '/views/login.html'));
		}



	});
});


app.post('/loginTo', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("users").findOne({ email: req.body.email, pswd: req.body.pswd }, function (err, result) {
			if (err) throw err;
			if (result) {
				//console.log(result);

				req.session.email = req.body.email;
				req.session.pswd = req.body.pswd;

				app.result = result;

				resp.render('indexLogin.ejs', { users: app.result, logged: true });
				resp.end('done');

			} else if (!result) {
				resp.sendFile(path.join(__dirname + '/views/login.html'));
			}
			db.close();
		});

	});

});


app.route('/show/:id').get((req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mydb");
		var ObjectId = require('mongodb').ObjectID;
		var id1 = req.params.id;

		dbo.collection("potrawy").find(ObjectId(id1)).toArray(function (err, res) {
			if (err) return console.log("Error: " + err);
			console.log("Wyswietlamy szczegoly potrawy!");

			if (req.session.email) {
				resp.render('show.ejs', { potrawy: res, logged: true });
			}
			else resp.render('show.ejs', { potrawy: res, logged: false });
		});
	});
});

app.get('/delete/:id', (req, resp) => {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mydb");
		var ObjectId = require('mongodb').ObjectID;
		var id1 = { _id: ObjectId(req.params.id) };

		if (req.session.email) {
			dbo.collection("potrawy").deleteOne(id1, function (err, res) {
				if (err) throw err;
				console.log("Usunieto potrawe!");
				resp.redirect('/');
				resp.end();
				db.close();
			});
		} else {
			resp.sendFile(path.join(__dirname + '/views/login.html'));
		}


	});
});

app.route('/edit/:id')
	.get((req, resp) => {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("mydb");
			var ObjectId = require('mongodb').ObjectID;
			var id1 = req.params.id;

			dbo.collection("potrawy").find(ObjectId(id1)).toArray(function (err, res) {
				if (err) return console.log("Error: " + err);
				console.log("Edytujemy potrawe!");
				if (req.session.email) {
					resp.render('edit.ejs', { potrawy: res });
				} else {
					resp.sendFile(path.join(__dirname + '/views/login.html'));
				}
			});
		});
	})

	.post((req, res) => {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;


			var dbo = db.db("mydb");
			var ObjectId = require('mongodb').ObjectID;
			var id = req.params.id;
			var nazwa = req.body.nazwa;
			var cena = req.body.cena;
			var info = req.body.info;
			var kategoria = req.body.kategoria;
			var status = req.body.status;

			dbo.collection("potrawy").updateMany({
				_id: ObjectId(id)
			}, {
				$set: {
					nazwa: nazwa,
					cena: cena,
					info: info,
					kategoria: kategoria,
					status: status
				}
			}, (err, result) => {
				if (err) return res.send(err);

				res.redirect('/');

				console.log("Udalo sie ");
			})

		});
	});