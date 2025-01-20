🌟 Proyecto de Gestión de Usuarios y Bootcamps 🌟

Este proyecto fue desarrollado utilizando Node.js, Sequelize, y PostgreSQL. Permite gestionar usuarios, bootcamps y la relación entre ellos mediante una API REST.

📂 Estructura del Proyecto
plaintext
Copiar
Editar
- .env
- .gitignore
- .sequelizerc
- config/
  - db.config.js
  - index.js
- controllers/
  - bootcamp.controller.js
  - index.js
  - user.controller.js
- estructura.js
- estructura_proyecto.txt
- migrations/
  - 20250117222424-create-user.js
  - 20250117222428-create-bootcamp.js
  - 20250117222436-create-user-bootcamp.js
- models/
  - bootcamp.model.js
  - index.js
  - user.model.js
  - userbootcamp.model.js
- node_modules/
- package-lock.json
- package.json
- readme.md
- routers/
  - bootcamp.router.js
  - index.js
  - user.router.js
- seeders/
  - 20250118000000-users.js
  - 20250118010000-bootcamps.js
  - 20250118020000-user-bootcamp.js
- server.js

⚙️ Configuración del Proyecto

1️⃣ Instalar dependencias
bash
Copiar
Editar
npm install
2️⃣ Crear el archivo .env
Ejemplo de contenido para el archivo .env:

plaintext
Copiar
Editar
DB_NAME=db_bootcamp
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DIALECT=postgres
3️⃣ Crear la base de datos
bash
Copiar
Editar
npx sequelize db:create
4️⃣ Ejecutar las migraciones
bash
Copiar
Editar
npx sequelize db:migrate
5️⃣ Cargar los datos iniciales (seeders)
bash
Copiar
Editar
npx sequelize db:seed:all

🚀 Funcionalidades
Endpoints de Usuarios 
➕ Crear un usuario:
POST localhost:3000//users

🔍 Obtener un usuario por ID con sus bootcamps:
GET /users/:id

📜 Listar todos los usuarios con sus bootcamps:
GET /users

✏️ Actualizar un usuario por ID:
PUT /users/:id

❌ Eliminar un usuario por ID:
DELETE /users/:id

Endpoints de Bootcamps 
➕ Crear un bootcamp:
POST localhost:3000//bootcamp

🔍 Obtener un bootcamp por ID con sus usuarios:
GET /bootcamp/:id

📜 Listar todos los bootcamps con sus usuarios:
GET /bootcamp

✏️ Actualizar un bootcamp por ID:
PUT /bootcamp/:id

❌ Eliminar un bootcamp por ID:
DELETE /bootcamp/:id

Endpoint de Relación Usuario-Bootcamp
🔗 Asignar un usuario a un bootcamp:
POST /bootcamps/:bootcampId/users/:userId

🛠️ Consultas SQL de Ejemplo
Verificar relaciones en user_bootcamp
sql
Copiar
Editar

SELECT * FROM "user_bootcamp" WHERE bootcamp_id = 1;

🛠️ Herramientas y Librerías Utilizadas

Node.js: Framework para construir la API.
Sequelize: ORM para interactuar con la base de datos.
PostgreSQL: Sistema de gestión de bases de datos.
Express: Framework para manejar las rutas y controladores.
dotenv: Para manejar variables de entorno.

✅ Notas Importantes
Asegúrate de configurar correctamente el archivo .env antes de ejecutar el proyecto.
Todas las consultas están diseñadas para funcionar con la estructura del proyecto mencionada.
