/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Passwords = require('machinepack-passwords')

module.exports = {

  login: function (req, res) {
    var parametros = req.allParams()
    Usuario
      .findOne({correo: parametros.correo})
      .exec(function (err, usuarioEncontrado) {
        if (err)
          res.serverError(error);

        if (!usuarioEncontrado) {
          res.serverError('No existe el usuario')
        } else {

          if (usuarioEncontrado.password==parametros.password){

            Passwords.encryptPassword({password: usuarioEncontrado.password}).exec({
              error: function (err) {
                res.serverError('Error de encripcion')
              },
              success: function (passwordMarcelo) {
                Usuario.update({
                    id:usuarioEncontrado.id
                  },
                  {
                    password:passwordMarcelo
                  }).exec(function (err, marceloActualizado) {
                  if(err) return res.serverError(err)

                  if(!marceloActualizado){
                    return res.serverError("El usuario no se actualizo")
                  }
                  else
                  {
                    sails.log.info('Password de usuario actualizada');
                    res.view('homepage')

                  }
                })
              }
            })
          }
          else {

          Passwords
            .checkPassword({
              passwordAttempt: parametros.password,
              encryptedPassword: usuarioEncontrado.password
            })
            .exec({
              error: function (err) {
                res.serverError(err)
              },
              incorrect: function () {
                res.serverError('Contrasenia encriptada incorrecta')
              },
              success: function () {
                res.cookie('idUsuario', usuarioEncontrado.id);
                req.session.authenticated = true
                return res.redirect('/encuestas');
              }
            })
          }
        }
      })
    },

  logout: function (req, res){
    req.session.authenticated = false
    return res.redirect('/');
  },

  autenticacion: function (req, res) {
    if (req.session.authenticated) {
      return res.view('homepage', {
        isAutenticado: true
      })
    } else {
      return res.view('homepage', {
        isAutenticado: false
      })
    }
  }
};
