const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.result = [];
const routes = require("./routesApi.js");
routes(app);

const routesAuth = require("./routesAuthApi.js");
routesAuth(app);

const routesJWT = require("./routesJWTApi.js");
routesJWT(app);

var MongoClient = require('mongodb').MongoClient;
const { response } = require('express');
var url = "mongodb://mongo:27017/mydb";


app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: true }));
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
			console.log("/");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('index.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('index.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/przystawki");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/zupy");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/salaty");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/makarony");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/miesa");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/owoceMorza");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/desery");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/dlaDzieci");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexCategory.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/dostepne");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/niedostepne");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });
				}
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
			console.log("/naZamowienie");

			if (req.session.email) {

				const zmienna = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('indexStatus.ejs', { potrawy: app.result, logged: true });
				} else {
					resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });
				}
			}
			else resp.render('indexStatus.ejs', { potrawy: app.result, logged: false });
		})
		.catch(error => {
			console.log(error);
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


app.get('/login.html', (req, resp) => {
	resp.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/register.html', (req, resp) => {
	resp.sendFile(path.join(__dirname + '/views/register.html'));
});


app.post('/potrawy', (req, resp) => {
	if (req.session.email) {

		const zmienna0 = {
			email: req.session.email
		};

		let accessToken = req.session.accessToken;

		let pass = handleJWT(zmienna0, accessToken, req);

		console.log("Pass: " + pass);
		if (pass === true) {

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
				.then(json => {
					console.log(json);
					app.result.push(json);
				})
				.catch(error => {
					console.log(error);
				});

			//resp.render('index.ejs', { potrawy: app.result, logged: true });
			resp.redirect('/')
		}
		else resp.render('index.ejs', { potrawy: app.result, logged: false });

		resp.end();
	} else {
		resp.sendFile(path.join(__dirname + '/views/login.html'));
	}
});



app.post('/loginTo', (req, res) => {

	const zmienna = {
		email: req.body.email,
		pswd: req.body.pswd
	};

	fetch('http://localhost:8080/loginToApi', {
		method: 'POST',
		body: JSON.stringify(zmienna),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => res.json())
		.then(response => {
			console.log('RESP DATA: ' + response.data);

			if (response.data != "ERROR") {
				req.session.email = response.data.email;

				app.result = response.data;

				fetch('http://localhost:8080/generateAccessTokenApi', {
					method: 'POST',
					body: JSON.stringify(response.data),
					headers: { 'Content-Type': 'application/json' }
				})
					.then(res => res.json())
					.then(response => {
						console.log('ODP TOKEN: ' + response.accessToken);

						let ac = response.accessToken;
						req.session.accessToken = ac;
						req.session.save();
					}).catch(error => {
						console.log(error);
					});

				////
				res.render('indexLogin.ejs', { users: app.result, logged: true });
				res.end('done');
			}
			else {
				res.sendFile(path.join(__dirname + '/views/login.html'));
			}

		})
		.catch(error => {
			console.log(error);
		});

});


app.post('/registerTo', (req, res) => {

	const zmienna = {
		email: req.body.email,
		pswd: req.body.pswd
	};

	console.log('SERVER');
	console.log(zmienna);

	fetch('http://localhost:8080/registerToApi', {
		method: 'POST',
		body: JSON.stringify(zmienna),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => res.json())
		.then(response => {
			console.log('RESP DATA: ' + response.data);

			if (response.data != "ERROR") {
				req.session.email = response.data.email;

				/* TUTAJ ACCESS TOKEN */

				//FIND_USER
				//Generate_Token

				const zmienna = {
					email: req.session.email,
					pswd: response.data.pswd
				};

				fetch('http://localhost:8080/findUserApi', {
					method: 'POST',
					body: JSON.stringify(zmienna),
					headers: { 'Content-Type': 'application/json' }
				})
					.then(resp =>
						resp.json()
					)
					.then(resp => {
						const user = resp.odp[0];

						var user01 = {
							id: resp.odp[0]._id,
							mail: resp.odp[0].email,
							pswd: resp.odp[0].pswd
						};

						//////////////////////
						fetch('http://localhost:8080/generateAccessTokenApi', {
							method: 'POST',
							body: JSON.stringify(user),
							headers: { 'Content-Type': 'application/json' }
						})
							.then(res => res.json())
							.then(response => {
								console.log('ODP TOKEN: ' + response.accessToken);

								let ac = response.accessToken;
								req.session.accessToken = ac;
								req.session.save();
							}).catch(error => {
								console.log(error);
							});
						/////////////////////

					});


				/* TUTAJ ACCESS TOKEN */
				app.result = response.data;
				res.render('indexLogin.ejs', { users: app.result, logged: true });
				res.end('done');
			}
			else {
				res.sendFile(path.join(__dirname + '/views/login.html'));
			}

		})
		.catch(error => {
			console.log(error);
		});

});



app.route('/show/:id').get((req, resp) => {
	var id1 = req.params.id;

	axios.get('http://localhost:8080/potrawaApi/' + id1)
		.then(response => {
			app.result = response.data;
			console.log("/show");

			if (req.session.email) {

				const zmienna0 = {
					email: req.session.email
				};

				let accessToken = req.session.accessToken;

				let pass = handleJWT(zmienna0, accessToken, req);

				console.log("Pass: " + pass);
				if (pass === true) {
					resp.render('show.ejs', { potrawy: app.result, logged: true });
				}
				else { resp.render('show.ejs', { potrawy: app.result, logged: false }); }
			}
			else { resp.render('show.ejs', { potrawy: app.result, logged: false }); }
		})
		.catch(error => {
			console.log(error);
		});

});

app.get('/delete/:id', (req, resp) => {

	if (req.session.email) {

		const zmienna0 = {
			email: req.session.email
		};

		let accessToken = req.session.accessToken;

		let pass = handleJWT(zmienna0, accessToken, req);

		console.log("Pass: " + pass);
		if (pass === true) {

			axios.get('http://localhost:8080/deletePotrawyApi/' + req.params.id)
				.then(response => {
					console.log("/delete");

					resp.redirect('/');
				})
				.catch(error => {
					console.log(error);
				});

		}
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
				console.log("/edit");

				if (req.session.email) {

					const zmienna0 = {
						email: req.session.email
					};

					let accessToken = req.session.accessToken;

					let pass = handleJWT(zmienna0, accessToken, req);

					console.log("Pass: " + pass);
					if (pass === true) {
						resp.render('edit.ejs', { potrawy: app.result });
					}
				} else {
					resp.sendFile(path.join(__dirname + '/views/login.html'));
				}
			})
			.catch(error => {
				console.log(error);
			});
	})

	.post((req, resp) => { /* cos nie tak  Cannot set headers after they are sent to the client*/
		if (req.session.email) {

			const zmienna0 = {
				email: req.session.email
			};

			let accessToken = req.session.accessToken;

			let pass = handleJWT(zmienna0, accessToken, req);

			console.log("Pass: " + pass);
			if (pass === true) {

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
					.then(res =>
						console.log(res)
					)
					.catch(error => {
						console.log(error);
					});

				resp.redirect('/')
				resp.end();
			}
		} else {
			resp.sendFile(path.join(__dirname + '/views/login.html'));
		}
	});

function handleJWT(zmienna, accessToken, req) {

	console.log("handleJWT " + zmienna);

	fetch('http://localhost:8080/findUserApi', {
		method: 'POST',
		body: JSON.stringify(zmienna),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(resp =>
			resp.json()
		)
		.then(resp => {

			var user01 = {
				id: resp.odp[0]._id,
				mail: resp.odp[0].email,
				pswd: resp.odp[0].pswd,
			};

			var refreshToken = resp.odp[0].refreshToken;

			const bearer = 'Bearer ' + accessToken.toString();

			//////////////////////
			fetch('http://localhost:8080/getAccessTokenApi', {
				method: 'POST',
				body: JSON.stringify(user01),
				headers: {
					'Content-Type': 'application/json',
					Authorization: bearer
				}
			})
				.then(resp =>
					resp.json()
				).then(resp => {
					console.log("ODPOWIEDZ NA ACCESS TOKEN");
					console.log(resp.data);
					console.log("Widac USER?: " + user01);

					const bearer = 'Bearer ' + refreshToken.toString();
					console.log("B: " + bearer);

					if (resp.data === "ERROR") {
						return fetch('http://localhost:8080/refreshAccessTokenApi', {
							method: 'POST',
							body: JSON.stringify(user01),
							headers: {
								'Content-Type': 'application/json',
								Authorization: bearer
							}
						})
							.then(res => res.json())
							.then(response => {
								console.log('ODP TOKEN: ' + response.accessToken);

								let ac = response.accessToken;
								req.session.accessToken = ac;
								req.session.save();

							}).catch(error => {
								console.log(error);
								return false;
							});
					}
					else { return false; }

				})
				.catch(error => {
					console.log("ODPOWIEDZ NA ACCESS TOKEN ERR");
					console.log(error);
					return false;
				});
		})
		.catch(error => {
			console.log("USER NOT FOUND");
			console.log(error);
			return false;
		});

	return true;
}

function editPotrawa(zmienna) {
	fetch('http://localhost:8080/editPotrawyApi', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(zmienna)
	})
		.then(res => res.json())
		.then(res =>
			res.redirect('/') /*? */
		)
		.catch(error => {
			console.log(error);
		});
}
