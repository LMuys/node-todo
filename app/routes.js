var Todo = require('./models/todo');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});
    
    // Put todo to update checked
    app.put('/api/todos/:id', function(req, res) {
        // find the Todo by id and update the field(s)
        Todo.findById(req.params.id, function(err, todo) {
            if (err) res.send(err);
            // Set false by default
            todo.done = req.body.done || false;
            todo.snoozed = req.body.snoozed || false;
            // Save the changes
            todo.save(function(err) {
                if (err) 
                    res.send(err);
                
                getTodos(res);
            });
        });
    });
    
    app.delete('/api/todos/:id', function(req, res) {
        // Find the todo by id and then delete it
        Todo.findById(req.params.id).remove(function(err){
            if (err) 
                res.send(err);
            getTodos(res);
        });
    });
    
    app.delete('/api/todos/', function(req, res) {
        
    })

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
