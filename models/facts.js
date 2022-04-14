let mongoose = require('mongoose');

let factSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  fact: String,
  reference: String,
  type: String
});

//Fact is a model which has a schema factSchema

module.exports = new mongoose.model('Fact', factSchema);
