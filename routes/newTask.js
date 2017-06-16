var express = require('express');
var router = express.Router();

var Task = require('../models/task');

// Get newTask
router.get('/', ensureAuthenticated, function(req, res){
	res.render('newTask');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


// new task
router.post('/newTask', function(req, res){
	var name = req.body.name;
	var description = req.body.description;
	var user = req.body.user;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('description', 'Description is required').notEmpty();
	req.checkBody('user', 'User is required').notEmpty();
	
	var errors = req.validationErrors();

	if(errors){
		res.render('newTask',{
			errors:errors
		});
	} else {
		var newTask = new Task({
			name: name,
			description:description,
			user: user
		});

		Task.createTask(newTask, function(err, task){
			if(err) throw err;
			console.log(task);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});


module.exports = router;