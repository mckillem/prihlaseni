var mongoose = require('mongoose');

// Task Schema
var TaskSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	description: {
		type: String
	},
	user: {
		type: String
	}
});

var Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.getTaskByName = function(name, callback){
	var query = {name: name};
	Task.findOne(query, callback);
}

module.exports.getTaskById = function(id, callback){
	Task.findById(id, callback);
}
