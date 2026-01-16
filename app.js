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
//Agregar 2 categorias, por ejemplo monitores y laptops, con datos estaticos
app.get('/', (req, res) => {
    // 1. Datos estáticos
    const listaProductos = [
        { nombre: 'Monitor LG 24"', precio: 150, categoria: 'Monitores', imagen: 'https://dummyimage.com/200x200/000/fff&Text=MonitorLg' },
        { nombre: 'Monitor Samsung 27"', precio: 200, categoria: 'Monitores', imagen: 'https://dummyimage.com/200x200/000/fff&Text=MonitorSamsung' },
        { nombre: 'Laptop Dell Inspiron', precio: 800, categoria: 'Laptops', imagen: 'https://dummyimage.com/200x200/000/fff&Text=LaptopDell' },
        { nombre: 'Laptop HP Pavilion', precio: 750, categoria: 'Laptops', imagen: 'https://dummyimage.com/200x200/000/fff&Text=LaptopHP' }
    ];

    // 2. Obtener categorías únicas automáticamente (para los botones)
    // Esto extrae "Monitores" y "Laptops" sin repetir
    const categorias = [...new Set(listaProductos.map(p => p.categoria))];

    // 3. Lógica de filtrado
    const categoriaSeleccionada = req.query.categoria; // Lee lo que viene en la URL (?categoria=...)
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
});

// 5. Encender el servidor
app.listen(PORT, () => {
    console.log(` >>> Servidor corriendo en http://localhost:${PORT}`);
    console.log(' >>> Presiona CTRL + C para detener');
});

