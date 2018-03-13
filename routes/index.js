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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Iniciar Sesion' });
});

router.get('/iniciar', function(req,res){
	res.render('inicioSesion',{title: "Iniciar Sesion"});
});


router.post('/inicioSesion',function(req, res){
	var usuarioBuscado = req.body.nomUsu;
	var contraBuscado = req.body.pass;
		mongoose.model('usuarios').find({'nombreUsuario': usuarioBuscado, 'contrasenia': contraBuscado},function(error,usuario){
				mongoose.model('personas').populate(usuario,{path: "idPersona"}, function(err,usuario){
					if (err) {
					return console.error(err); 
					res.send("Error al buscar dato");
					} else {
					console.log("Dato encontrado" + usuario);
					
						res.format({
							html:function () {
								res.render('usuarios/index',
									{title:'Bienvenido', 'usuario':usuario});
							},
							json:function () {
								res.json(usuario);
							}
						});
					}

				});
			});
	});
module.exports = router;
