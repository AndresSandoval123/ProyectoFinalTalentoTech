/* Fetch para ver todos los libros con el endpoint de la api ya creado */

const url = "http://localhost:3000"

async function obtenerTodosLosLibros() {
  try {
      const response = await fetch(url + "/api/verLibros");
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const libros = await response.json();
      console.log(libros);
      mostrarLibros(libros);
  } catch (error) {
      console.error('Error:', error);
  }
}

obtenerTodosLosLibros();

function mostrarLibros(libros){

  let todos = document.getElementById("todos");
  todos.innerHTML = "";

  const listaDeLibros = libros.info;

  for( let i = 0 ; i < listaDeLibros.length ; i++){
    todos.innerHTML += `
      <div class="todos">
      <img src="${listaDeLibros[i].caratula}"></img>
      <p>${listaDeLibros[i].titulo}</p>
      <p>ISBN = ${listaDeLibros[i].isbn}</p>
      </div>`
  }
}

//Btn actializar la lista de libros
document.getElementById("btnActualizar").addEventListener("click", obtenerTodosLosLibros);

// Ver detalle de un libro por isbn

let rtaDetalle = document.getElementById("rtaDetalle");

async function detalleLibro() {
  let isbn = document.getElementById("codigo").value;

  if (!isbn) {
    rtaDetalle.innerHTML=`<p>Por favor ingresa un ISBN</p>`
    return;
  }
  

  try {
      const response = await fetch(url + "/api/"+ isbn);
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const libro = await response.json();
        // Verificar si el libro existe
        if (!libro || libro.info.length === 0) {
          rtaDetalle.innerHTML = `<p>El libro con ISBN ${isbn} no existe.</p>`;
          return;
      }
      console.log(libro);
      verDetalle(libro);
  } catch (error) {
      console.error('Error:', error);
  }
}

function verDetalle(libro) {
  const detalleLibro = libro.info[0];

  rtaDetalle.innerHTML = `
    <div>
    <img src="${detalleLibro.caratula}"></img>
    </div>
    <div>
    <p> Detalle de libro</p>
    <p>ISBN = ${detalleLibro.isbn}</p>
    <p>Titulo = ${detalleLibro.titulo}</p>
    <p>Tema = ${detalleLibro.tema}</p>
    <p>Resumen = ${detalleLibro.resumen}</p>
    <p>Autor = ${detalleLibro.autor}</p>
    <p>Fecha de edicion = ${detalleLibro.fecEdicion}</p>
    <p>Numero de paginas = ${detalleLibro.numPaginas}</p>
    <p>Tipo de ejemplar = ${detalleLibro.tipoEjemplar}</p>
    <p>Numero de disponibles = ${detalleLibro.cantEjemplaresDisponibles}</p>
    <p>Ubicacion = ${detalleLibro.ubicacion}</p>
    </div>
  `;
}

document.getElementById("btndetalleLibro").addEventListener("click", detalleLibro);
let btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.addEventListener("click", ()=>{
  rtaDetalle.innerHTML = "";
});


// Crear libro

document.getElementById("btncrear").addEventListener("click", async () => {
  const form = document.getElementById("formCrearLibro");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  form

  try {
    const response = await fetch(`${url}/api/creaLibro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    document.getElementById("rtaCrear").innerHTML = `<p>Libro creado con éxito: ${result.titulo}</p>`;
    form.reset(); //Limpia los campos del formulario.
  } catch (error) {
    console.error('Error:', error); // Esto debería mostrar detalles del error en la consola
    document.getElementById("rtaCrear").innerHTML = `<p>Error al crear el libro: ${error.message || 'Error desconocido'}</p>`;
  }
});



//Eliminar libro

const btnEliminar = document.getElementById("btnEliminar");

btnEliminar.addEventListener("click", async()=>{
  const isbn = document.getElementById("eliminar").value;

  try{
    const response = await fetch(`${url}/api/libro/${isbn}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(!response.ok){
      throw new Error(`Error: ${response.statusText}`)
    }
    
    const result = await response.json();
    document.getElementById("rtaEliminar").innerHTML = `<p>${result.message}</p>`;
  } catch (error) {
    console.error('Error:', error);
    document.getElementById("rtaEliminar").innerHTML = `<p>Error al eliminar el libro: ${error.message}</p>`;
  }
})

