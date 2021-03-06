/**
 * Comentario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{
      type:'integer',
      unique: true,
      primaryKey: true,
    },
    fechaCreacion: {
      type: 'date',
      required: true
    },
    texto: {
      type: 'string',
      required: true
    },
    idUsuario: {
      model: 'Usuario'
    },
    idEncuesta: {
      model: 'Encuesta'
    }

  }
};
