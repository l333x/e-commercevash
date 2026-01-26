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

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Ruta para ver detalle de un producto
app.get('/producto/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        res.render('detalle', { producto });
    } catch (error) {
        console.log("Error cargando detalle del producto:", error);
        res.status(500).send("Error en el servidor");
    }
});

// ========== RUTAS DE ADMINISTRACIÓN ==========

// Panel de administración - Listar todos los productos
app.get('/admin', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.render('admin', { productos, mensaje: null });
    } catch (error) {
        console.log("Error cargando admin:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Formulario para agregar nuevo producto
app.get('/admin/producto/nuevo', (req, res) => {
    res.render('formulario-producto', {
        producto: null,
        accion: '/admin/producto',
        titulo: 'Agregar Producto'
    });
});

// Crear nuevo producto
app.post('/admin/producto', async (req, res) => {
    try {
        const { nombre, precio, categoria, descripcion, imagen } = req.body;

        const nuevoProducto = new Producto({
            nombre,
            precio: parseFloat(precio),
            categoria,
            descripcion: descripcion || undefined,
            imagen: imagen || undefined
        });

        await nuevoProducto.save();
        res.redirect('/admin');
    } catch (error) {
        console.log("Error creando producto:", error);
        res.status(500).send("Error creando el producto");
    }
});

// Formulario para editar producto
app.get('/admin/producto/:id/editar', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        res.render('formulario-producto', {
            producto,
            accion: `/admin/producto/${producto._id}/editar`,
            titulo: 'Editar Producto'
        });
    } catch (error) {
        console.log("Error cargando formulario de edición:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Actualizar producto
app.post('/admin/producto/:id/editar', async (req, res) => {
    try {
        const { nombre, precio, categoria, descripcion, imagen } = req.body;

        await Producto.findByIdAndUpdate(req.params.id, {
            nombre,
            precio: parseFloat(precio),
            categoria,
            descripcion,
            imagen
        });

        res.redirect('/admin');
    } catch (error) {
        console.log("Error actualizando producto:", error);
        res.status(500).send("Error actualizando el producto");
    }
});

// Eliminar producto
app.post('/admin/producto/:id/eliminar', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        console.log("Error eliminando producto:", error);
        res.status(500).send("Error eliminando el producto");
    }
});

// 5. Encender el servidor
app.listen(PORT, () => {
    console.log(` >>> Servidor corriendo en http://localhost:${PORT}`);
    console.log(' >>> Presiona CTRL + C para detener');
});