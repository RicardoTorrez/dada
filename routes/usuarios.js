
//Nuevo controlador
var express = require('express');
var router = express.Router(),
	mongoose = require('mongoose'), //usando la coma no hace falta usar la palabra reservada "var"
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');


router.use(bodyParser.urlencoded({extended:true}));

router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body == 'object' && '_method' in req.body) {
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}))





router.route('/')	
	.get(function(req, res){
		mongoose.model('usuarios').find({},	function(err, usuarios){
				mongoose.model('personas').populate(usuarios,{path: "idPersona"}, function(err,usuarios){
					if (err) {
					return console.error(err); 
					} else {
					console.log("usuarios y personas");
					console.log(usuarios);
						res.format({
							html:function () {
								res.render('usuarios/index',
									{title:'Lista usuarios', 'usuarios':usuarios});
							},
							json:function () {
								res.json(usuarios);
							}
						});
					}

				});
				
			});
	});



/*router.get('/ejemploPer', function(req,res){
	mongoose.model('personas').find({}, function(err,personas){
		if(error)
			console.log("no se hizo la consulta");
		else{
			console.log("consulta hecha" + personas);
					res.format({
						html:function (argument) {
							res.render('personas/index',
								{title:'Lista personas', 'personas':personas});
						},
						json:function () {
							res.json(personas);
						}
					});
		}
	});
});*/


module.exports = router;

