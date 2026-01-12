// 1. IMportar la libreria para crear aplicaciones web
const express = require('express');

// 2. Crear una instancia de express (aplicacion principal)
const app = express();

// 3. DEfinir un puesrto sobre el cual funcione la aplicacion
const PORT = 3000;
// ----configuracion----
//EStablecer ejs como motor de plantillas
app.set('view engine', 'ejs');

//EStablecer la carpeta publica con los elementos estaticos (css, imagenes, js cliente)
app.use(express.static('public'));


//4. crear la primera "ruta" cuando el usuario ingrese a la raiz de nuestro sitio y un boton que me redirija a /productos
app.get('/', (req, res) => {
    res.send(`
        <h1>Bienvenido a mi tienda en línea</h1>
        <p>Explora nuestros productos exclusivos.</p>
        <a href="/productos"><button>Ver Productos</button></a>
    `);
});

//ruta para /productos
app.get('/productos', (req, res) => {
    res.send(`
        <h1>Lista de Productos</h1>
        <ul>
            <li>Producto 1</li>
            <li>Producto 2</li>
            <li>Producto 3</li>
        </ul>
        <a href="/"><button>Volver al Inicio</button></a>
    `);
});
// 5. Encender el servidor
app.listen(PORT, () => {
    console.log(` >>> Servidor corriendo en http://localhost:${PORT}`);
    console.log(' >>> Presiona CTRL + C para detener');
});

