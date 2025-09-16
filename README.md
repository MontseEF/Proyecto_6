# Proyecto 6 – API con autenticación y productos

Este proyecto es parte del bootcamp y consiste en armar un **backend en Node.js con Express**, conectado a **MongoDB Atlas**, que permita registrar usuarios, iniciar sesión con **JWT** y manejar un CRUD de productos.

Lo hice para practicar:
- Conexión a base de datos en la nube con MongoDB.
- Crear y proteger rutas con tokens.
- Manejo de modelos con Mongoose.
- Documentar con Swagger.

---

## Métodos de ingreso

- A través del link https://proyecto-6-2l39.onrender.com/api/docs/
- De forma local
---

## 🔑 Endpoints principales


Registrar Usuarios: POST /api/user/register

Login: POST /api/user/login → devuelve { user, token }

Verificar token: GET /api/user/verifytoken

Actualizar usuario: PUT /api/user/update

Crear producto: POST /api/product/create

Listar todos: GET /api/product/readall

Ver uno: GET /api/product/readone/:id

Actualizar: PUT /api/product/update/:id

Eliminar: DELETE /api/product/delete/:id

Las rutas de productos (crear, actualizar, eliminar) requieren estar autenticado con token.

---

## Estructura

Proyecto_6/                          
├── controllers/                 
│   ├── productController.js         
│   └── userController.js                    
│
├── docs/
│   └── swagger.js        
│   └── swagger.yaml       
│
├── middleware/
│   └── authMiddleware.js  
│
├── models/
│   ├── productModel.js   
│   └── userModel.js   
│
├── routes/
│   ├── productRoutes.js  
│   └── userRoutes.js      
│
├── .env                   
├── .gitignore  
├── package.json
├── server.js              
└── README.md              

---

## Tecnologías

Node.js

Express

MongoDB Atlas + Mongoose

JWT

Bcrypt

Swagger

Render

---

## Notas personales

- Lo más complicado fue conectar MongoDB Atlas con Render (por el tema de la whitelist de IPs).

- Una vez configurado, el despliegue funciona perfecto y Swagger ayuda mucho a probar.

- Aprendí a usar bcrypt para encriptar contraseñas y JWT para proteger rutas.


Sin duda hay que reconocer que este camino ha sido toda una aventura desafiante de aprendizaje.
Espero que el proyecto sea de su agrado, muchas gracias.
