module.exports = function (app) {

  let ctrlLibro = require('../controller/ctrlLibro');

  app.route('/api/verLibros')
    .get(ctrlLibro.getAllLibros);

  app.route('/api/:isbnLibro')
    .get(ctrlLibro.getLibro);

  app.route('/api/libro/:isbnLibro')
    .delete(ctrlLibro.eliminarLibro)

  app.route('/api/creaLibro')
    .post(ctrlLibro.crearLibro)

}