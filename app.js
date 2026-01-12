// 1. IMportar la libreria para crear aplicaciones web
const express = require('express');

// 2. Crear una instancia de express (aplicacion principal)
const app = express();

// 3. DEfinir un puesrto sobre el cual funcione la aplicacion
const PORT = 3000;

//4. CRear la primera "RUta" cuando el usuario ingrese a la raiz de la aplicacion
app.get('/', (req, res) => {
    res.send('<h1>Servidor de E-commerce Iniciando</h1><p>NPM Y EXPRESS FUNCIONANDO...</p>');
});
// 5. Encender el servidor
app.listen(PORT, () => {
    console.log(` >>> Servidor corriendo en http://localhost:${PORT}`);
    console.log(' >>> Presiona CTRL + C para detener');
});

