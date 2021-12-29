const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.result = [];
const routes = require("./routesApi.js");
routes(app);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";


app.use(session({ secret: 'ssshhhhh', saveUninitialized: false, resave: false }));
app.use(bodyParser.json());
app.use(express.json());
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
	axios.get('http://localhost:8080/allCategoryApi/Przystawki')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/zupy', (req, resp) => {
	axios.get('http://localhost:8080/allCategoryApi/Zupy')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/salaty', (req, resp) => {
	axios.get('http://localhost:8080/allCategoryApi/Salaty')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/makarony', (req, resp) => {
	axios.get('http://localhost:8080/allCategoryApi/Makarony')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/miesa', (req, resp) => {
	axios.get('http://localhost:8080/allCategoryApi/Miesa')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/owoceMorza', (req, resp) => {
	axios.get('http://localhost:8080/allCategoryApi/Ryby%20i%20owoce%20morza')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});


app.get('/desery', (req, resp) => {
	axios.get('http://localhost:8080/allCategoryApi/Desery')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/dlaDzieci', (req, resp) => {
	axios.get('http://localhost:8080/allCategoryApi/Dla%20dzieci')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/dostepne', (req, resp) => {
	axios.get('http://localhost:8080/allStatusApi/Dostepne')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/niedostepne', (req, resp) => {
	axios.get('http://localhost:8080/allStatusApi/Niedostepne')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/naZamowienie', (req, resp) => {
	axios.get('http://localhost:8080/allStatusApi/Na%20zamowienie')
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});
});

app.get('/logOut', function (req, resp) {  /*  */
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		} else {
			resp.redirect('/');
		}
	});
});


app.get('/login.html', (req, resp) => {  /*  */
	resp.sendFile(path.join(__dirname + '/views/login.html'));
});


app.post('/potrawy', (req, resp) => {
	if (req.session.email) {

		var zmienna =
		{
			nazwa: req.body.nazwa,
			cena: req.body.cena,
			info: req.body.info,
			kategoria: req.body.kategoria,
			status: req.body.status
		};

		fetch('http://localhost:8080/addPotrawyApi', {
			method: 'POST',
			body: JSON.stringify(zmienna),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => res.json())
			.then(json => console.log(json))
			.catch(error => {
				console.log(error);
			});

		if (req.session.email) {
			resp.render('index.ejs', { potrawy: app.result, logged: true });
		}
		else resp.render('index.ejs', { potrawy: app.result, logged: false });

		resp.end();
	} else {
		resp.sendFile(path.join(__dirname + '/views/login.html'));
	}
});



app.post('/loginTo', (req, resp) => {  /*  */
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;

		var dbo = db.db("mydb");
		dbo.collection("users").findOne({ email: req.body.email, pswd: req.body.pswd }, function (err, result) {
			if (err) throw err;
			if (result) {

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
	var id1 = req.params.id;

	axios.get('http://localhost:8080/potrawaApi/' + id1)
		.then(response => {
			app.result = response.data;
			console.log("Response received!");

			if (req.session.email) {
				resp.render('show.ejs', { potrawy: app.result, logged: true });
			}
			else resp.render('show.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
		});

});

app.get('/delete/:id', (req, resp) => {

	if (req.session.email) {

		axios.get('http://localhost:8080/deletePotrawyApi/' + req.params.id)
			.then(response => {
				console.log(response.data);

				resp.redirect('/');
			})
			.catch(error => {
				console.log(error);
			});

	} else {
		resp.sendFile(path.join(__dirname + '/views/login.html'));
	}
});

app.route('/edit/:id')
	.get((req, resp) => {
		console.log("Edytujemy potrawe!");
		var id1 = req.params.id;
		axios.get('http://localhost:8080/potrawaApi/' + id1)
			.then(response => {
				app.result = response.data;
				console.log("Response received!");

				if (req.session.email) {
					resp.render('edit.ejs', { potrawy: app.result });
				} else {
					resp.sendFile(path.join(__dirname + '/views/login.html'));
				}
			})
			.catch(error => {
				console.log(error);
			});
	})

	.post((req, res) => { 
		if (req.session.email) {
			var zmienna =
			{
				id: req.params.id,
				nazwa: req.body.nazwa,
				cena: req.body.cena,
				info: req.body.info,
				kategoria: req.body.kategoria,
				status: req.body.status
			};

			fetch('http://localhost:8080/editPotrawyApi', {
				method: 'POST',
				body: JSON.stringify(zmienna),
				headers: { 'Content-Type': 'application/json' }
			})
				.then(res => res.json())
				.then(
					res.redirect('/')
				)
				.catch(error => {
					console.log(error);
				});

		} else {
			resp.sendFile(path.join(__dirname + '/views/login.html'));
		}
	});