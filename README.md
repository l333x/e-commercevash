# 🛒 Tienda App - E-commerce Educativo

![Status](https://img.shields.io/badge/Estado-En_Desarrollo-yellow?style=flat-square)
![NodeJS](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-Framework-white?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)

Un proyecto práctico de E-commerce desarrollado con fines académicos para comprender el funcionamiento del **Backend con Node.js** y el renderizado de vistas dinámicas.

---

## 🚀 Acerca del Proyecto

Este repositorio contiene una aplicación web funcional que simula una tienda en línea. El objetivo principal es demostrar la integración de tecnologías backend modernas, el manejo de rutas y la visualización de datos dinámicos.

Es ideal para estudiantes que buscan entender cómo estructurar un proyecto MVC (Modelo-Vista-Controlador) básico.

## 🛠️ Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución para el servidor.
* **Express.js**: Framework para el manejo de rutas y servidor HTTP.
* **EJS (Embedded JavaScript)**: Motor de plantillas para renderizar HTML con datos dinámicos.
* **MongoDB**: Base de datos NoSQL para persistencia de datos (productos, usuarios).
* **Bootstrap 5**: Estilizado rápido y responsivo de la interfaz.

## 📂 Estructura del Proyecto

Basado en la arquitectura actual, el proyecto se organiza de la siguiente manera:

```text
TIENDA-APP/
├── 📂 node_modules/    # Dependencias del proyecto
├── 📂 public/          # Archivos estáticos (CSS, Imágenes, JS del cliente)
├── 📂 views/           # Plantillas HTML dinámicas (.ejs)
│   └── index.ejs       # Página principal con listado de productos
├── .gitignore          # Archivos ignorados por Git
├── app.js              # 🏁 Punto de entrada (Configuración del servidor)
├── package.json        # Configuración y scripts del proyecto
└── package-lock.json   # Árbol de dependencias exactas