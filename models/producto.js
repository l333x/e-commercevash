const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        default: "https://dummyimage.com/200x200/000/fff"
    },
    descripcion: {
        type: String,
        trim: true,
        default: "Producto de alta calidad disponible en nuestra tienda."
    }
});

module.exports = mongoose.model('Producto', productoSchema, 'producto');