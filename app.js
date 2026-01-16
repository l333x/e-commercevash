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
    
    const listaProductos = [
        { nombre: "Laptop", 
          precio: 1200, 
          imagen: "https://dummyimage.com/200x200/000/fff&text=Laptop" 
        },
        { nombre: "Laptop", 
          precio: 1200, 
          imagen: "https://dummyimage.com/200x200/000/fff&text=Laptop" 
        },
        { nombre: "Laptop", 
          precio: 1200, 
          imagen: "https://dummyimage.com/200x200/000/fff&text=Laptop" 
        },
    ];
    //REnderizar los prodcutos con la plantilla
    res.render('index', { productos: listaProductos });
});

// 5. Encender el servidor
app.listen(PORT, () => {
    console.log(` >>> Servidor corriendo en http://localhost:${PORT}`);
    console.log(' >>> Presiona CTRL + C para detener');
});

