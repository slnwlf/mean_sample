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

// set view engine
app.set('view engine', 'hbs');

// set up mongodb connection
mongoose.connect('mongodb://localhost/mean_sample');

// require Todo model
var Todo = require('./models/todo');

// turn on port 3000
app.listen(3000, function() {
	console.log('server started');
});


// API routes
// get route with json

app.get('/api/todos', function (req, res) {
	Todo.find(function (err, allTodos) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(allTodos);
		}
	});
});

// create new todo
app.post('/api/todos', function (req, res) {
	var newTodo = new Todo(req.body);

// save new todo in db
	newTodo.save(function (err, savedTodo) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(savedTodo);
		}
	});
});

app.get('/api/todos/:id', function (req, res) {
	// get todo id from url params - as in req.params
	var todoId = req.params.id;

	// find todo in db by id
	Todo.findOne({ _id: todoId }, function (err, foundTodo){
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(foundTodo);
		}
	});
});

// update todo
app.put('/api/todos/:id', function (req, res) {
	// get todo id from url params
	var todoId = req.params.id;

	// find todo in db by id
	Todo.findOne({ _id: todoId }, function (err, foundTodo) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			// update the todo's attributes
			foundTodo.title = req.body.title;
			foundTodo.description = req.body.description;
			foundTodo.done = req.body.done;

			// save updated todo in db
			foundTodo.save(function (err, savedTodo) {
				if (err) {
					res.status(500).json({ error: err.message });
				} else {
					res.json(savedTodo);
				}
			});
		}
	});
});

app.delete('/api/todos/:id', function (req, res) {
	// get todo id from url params
	var todoId = req.params.id;

	// find todo in db by id and remove
	Todo.findOneAndRemove({ _id: todoId }, function (err, deletedTodo) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(deletedTodo);
		}
	});
});

// initiate index.hbs when a route is requested

app.get('*', function (req, res) {
	res.render('index');
});

