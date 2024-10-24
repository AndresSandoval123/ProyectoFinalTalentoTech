//En este archivo de la carpeta modelo, pero se debe hacer un esquema y su conformación de los documentos en una colección
let mongoose = require("mongoose");
let schema = mongoose.Schema;


let sqma = new mongoose.Schema(
  {
    isbn: { type: String, required: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    caratula: { type: String },
    fecEdicion: { type: String },
    numPaginas: { type: Number },
    cantEjemplaresDisponibles: { type: Number },
    resumen: { type: String },
    tipoEjemplar: { type: String },
    tema: { type: String },
    ubicacion: { type: String }
  }

);

module.exports = mongoose.model('collibro', sqma); // Esto exporta este modulo, para que se pueda usar por otros archivos dentro de mi codigo.