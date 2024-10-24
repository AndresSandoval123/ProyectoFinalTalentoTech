const collibro = require('../model/esqmLibro') //traemos el esquema de los libros que exportamos en la carpeta de controller
// Consulta Todos los libros
exports.getAllLibros = ( req,res) =>{
  try{
    collibro.find({})//si queremos algo en especifico de la coleccion, colocamos su clave y valor y nos genera la información solicitada.
    .then( (rta)=>{
      console.log("Rta" + rta);
      res.send( {msg: "ok", info:rta} )
    })
    .catch( (error) =>{
      console.log("Error consultando los libros " + error);
    } )
  } catch (error){

  }
}

exports.getLibro = ( req,res) =>{
  const isbn = req.params.isbnLibro; // Obtener el isbn desde los parámetros
  try{
    collibro.find({"isbn":isbn})//si queremos algo en especifico de la coleccion, colocamos su clave y valor y nos genera la información solicitada.
    .then( (rta)=>{
      console.log("Rta" + rta);
      res.send( {msg: "ok", info:rta} )
    })
    .catch( (error) =>{
      console.log("Error consultando los libros " + error);
    } )
  } catch (error){

  }
}

// Crear libro

exports.crearLibro = async (req, res) => {
  const { isbn, titulo, autor, caratula, fecEdicion, numPaginas, cantEjemplaresDisponibles, resumen, tipoEjemplar, tema, ubicacion } = req.body;

  const nuevoLibro = new collibro({
    isbn,
    titulo,
    autor,
    caratula,
    fecEdicion,
    numPaginas,
    cantEjemplaresDisponibles,
    resumen,
    tipoEjemplar,
    tema,
    ubicacion
  });

  try {
    const resultado = await nuevoLibro.save();
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al crear el libro:', error);
    res.status(500).json({ message: 'Error al crear el libro', error });
  }
};



exports.eliminarLibro = async (req, res) => {
  const isbn = req.params.isbnLibro; // Obtener el ISBN del parámetro de la URL
  try {
    const resultado = await collibro.deleteOne({ isbn });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.status(200).json({ message: 'Libro eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    res.status(500).json({ message: 'Error al eliminar el libro', error });
  }
};
