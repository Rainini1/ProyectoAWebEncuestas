/**
 * DetalleEncuestaController
 *
 * @description :: Server-side logic for managing Detalleencuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Chart = require('chart.js');

module.exports = {
	listarEncuesta: function (req, res) {

		idEncuesta = req.param('idEncuesta');
		
		Encuesta.findOne({
			id: idEncuesta
		})
		.populate('comentarios')
		.exec(function (error, encuestaEncontrada) {

				console.log(encuestaEncontrada);

				res.view('detalleEncuesta', {
						encuesta: encuestaEncontrada,
						comentarios: encuestaEncontrada.comentarios
				});
		})
	},

	meGusta: function (req, res) {
		idEncuesta = req.param('idEncuesta');

		Encuesta.findOne({
			id:idEncuesta
		}).exec(function (error, encuestaEncontrada) {

			Encuesta.update({
				id: idEncuesta
			},{
				likes: encuestaEncontrada.likes + 1
			}).exec(function (error, encuestaActualizada) {

				Comentario.find({
					idEncuesta: idEncuesta
				}).exec(function (error, cometariosEncontrados) {
					return res.redirect('/encuestas/detalle/'+idEncuesta);
				})
			})
		})
	},

	noMeGusta: function (req, res) {
		idEncuesta = req.param('idEncuesta');

		Encuesta.findOne({
			id:idEncuesta
		}).exec(function (error, encuestaEncontrada) {
			console.log(error);
			Encuesta.update({
				id: idEncuesta
			},{
				dislikes: encuestaEncontrada.dislikes + 1
			}).exec(function (error, encuestaActualizada) {
				console.log(error);
				Comentario.find({
					idEncuesta: idEncuesta
				}).exec(function (error, cometariosEncontrados) {
					console.log(error);
					return res.redirect('/encuestas/detalle/'+idEncuesta);
				})
			})
		})
	}
};
