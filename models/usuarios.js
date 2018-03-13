
var mongoose = require('mongoose');
var personas = mongoose.model('personas');

var usuarioSchema = new mongoose.Schema({

	nombreUsuario:String,
	contrasenia:String,
	idPersona: {type: mongoose.Schema.ObjectId, ref: "personas"}
});


mongoose.model('usuarios', usuarioSchema);
