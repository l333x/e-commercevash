// 1. Importar la libreria para crear aplicaciones web
const express = require('express');
const mongoose = require('mongoose');
// Importar el modelo de producto
const Producto = require('./models/producto');

// 2. Crear una instancia de express (aplicacion principal)
const app = express();

// 3. Definir un puerto sobre el cual funcione la aplicacion
const PORT = 3000;

// ---- configuracion ----
// Establecer ejs como motor de plantillas
app.set('view engine', 'ejs');

// Establecer la carpeta publica con los elementos estaticos (css, imagenes, js cliente)
app.use(express.static('public'));

// -- Conexion con mongodb ---
mongoose.connect('mongodb://127.0.0.1:27017/tienda')
    .then(() => {
        console.log('>>> Estas conectado miamor ❤️ ');
    })
    .catch((err) => {
        console.log('>>> Vales vrg pues ñañon, error en tu conexion', err);
    });

// 4. crear la primera "ruta" 
// OJO AQUÍ BB: Le puse 'async' para poder esperar a la base de datos
app.get('/', async (req, res) => {
    
    try {
        // AQUÍ ES DONDE DEBE IR: Consultar la lista de productos DENTRO de la ruta
        const listaProductos = await Producto.find();

        // 2. Obtener categorías únicas automáticamente
        const categorias = [...new Set(listaProductos.map(p => p.categoria))];

        // 3. Lógica de filtrado
        const categoriaSeleccionada = req.query.categoria; 
        let productosFiltrados = listaProductos;

        if (categoriaSeleccionada) {
            productosFiltrados = listaProductos.filter(producto => producto.categoria === categoriaSeleccionada);
        }
    
        // 4. Renderizar enviando: productos, categorías y cuál está activa
        res.render('index', { 
            productos: productosFiltrados,
            categorias: categorias,
            categoriaActiva: categoriaSeleccionada
        });
        
    } catch (error) {
        console.log("Error cargando la página miamor:", error);
        res.status(500).send("Error en el servidor");
    }
});

// 5. Encender el servidor
app.listen(PORT, () => {
    console.log(` >>> Servidor corriendo en http://localhost:${PORT}`);
    console.log(' >>> Presiona CTRL + C para detener');
});