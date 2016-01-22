// This is node so this file will act as my server

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

// set up bodyParser - for receiving form data
app.use(bodyParser.urlencoded({ extended: true }));

// adding this which is making bodyParser JSON data format
app.use(bodyParser.json());

// allow static files by creating a public folder
app.use(express.static(__dirname + '/public'));

// set up mongodb connection
mongoose.connect('mongodb://localhost/mean_sample');

// turn on port 3000
app.listen(3000, function() {
	console.log('server started');
});

app.get('*', function (req, res) {
	res.render('index');
});

// API routes

app.get('/api/todos', function (req, res) {
	Todo.find(function (err, allTodos) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(allTodos);
		}
	});
});

app.post('/api/todos', function (req, res) {
	var newTodo = new Todo(req.body);
	newTodo.save(function (err, savedTodo) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(savedTodo);
		}
	});
});

app.get('/api/todos/:id', function (req, res) {

});

app.put('/api/todos/:id', function (req, res) {

});

app.delete('/api/todos/:id', function (req, res) {

});

// initiate index.hbs when a route is requested

app.get('*', function (req, res) {
	res.render('index');
});

