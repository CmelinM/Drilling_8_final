# API de Gestión de Bootcamps

## Descripción
API REST para la gestión de bootcamps y usuarios, con sistema de autenticación JWT.

## Características
- Autenticación con JWT
- Gestión de usuarios
- Gestión de bootcamps
- Relación muchos a muchos entre usuarios y bootcamps

## Tecnologías
- Node.js
- Express
- Sequelize (PostgreSQL)
- JWT (JSON Web Tokens)
- bcryptjs

## Instalación
1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Configurar variables de entorno en `.env`:
```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_password
DB_NAME=nombre_db
PORT=3000
```
4. Ejecutar migraciones:
```bash
npx sequelize-cli db:migrate
```
5. Iniciar el servidor:
```bash
npm run dev
```

## Documentación de la API

### Autenticación

#### Registro de Usuario
```http
POST /api/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login
```http
POST /api/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```
Respuesta:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "accessToken": "eyJhbGciOiJIUzI1...",
  "tokenType": "Bearer",

  "Ejemplo Authorization": "Campo Key: Authorization.",
  
  "Ejemplo token": "Campo Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM3NjAwNDI1LCJleHAiOjE3Mzc2MDA0ODV9.aPQRbNErgYuO7S4Lw5UY_cy7ofwWtqKrAbcc00_JJ4Y"
}
```

### Endpoints Públicos

#### Listar Bootcamps
```http
GET /api/bootcamp
```

### Endpoints Protegidos
Requieren header de autorización:
```http
Authorization: Bearer <token>
```

#### Usuarios
- `GET /api/user` - Listar usuarios
- `GET /api/user/:id` - Obtener usuario por ID
- `PUT /api/user/:id` - Actualizar usuario
- `DELETE /api/user/:id` - Eliminar usuario

#### Bootcamps
- `POST /api/bootcamp` - Crear bootcamp
- `GET /api/bootcamp/:id` - Obtener bootcamp por ID
- `PUT /api/bootcamp/:id` - Actualizar bootcamp
- `DELETE /api/bootcamp/:id` - Eliminar bootcamp

#### Agregar Usuario a Bootcamp
```http
POST /api/bootcamp/adduser
Content-Type: application/json
Authorization: Bearer <token>

{
  "bootcampId": 1,
  "userId": 1
}
```

## Seguridad
- Los tokens JWT están configurados para expirar en 1 minuto (solo para pruebas)
- Las contraseñas se almacenan hasheadas usando bcryptjs
- Todas las rutas (excepto registro, login y listar bootcamps) requieren autenticación

## Configuración del Token
El tiempo de expiración del token se puede modificar en:
```javascript
// controllers/auth.controller.js - línea 89
const token = jwt.sign(
  { id: user.id },
  config.secret,
  { expiresIn: '1m' }  // Modificar este valor
);
```

Ejemplos de valores para `expiresIn`:
- `'1h'` - 1 hora
- `'30m'` - 30 minutos
- `'24h'` - 24 horas
- `'7d'` - 7 días
- `'60m'` - 60 minutos

También se puede configurar en segundos:
```javascript
// config/auth.config.js - línea 3
module.exports = {
  secret: "bootcamp-secret-key",
  jwtExpiration: 60  // Tiempo en segundos (60 = 1 minuto)
};
```

## Modelos de Datos

### Usuario
```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  password: String
}
```

### Bootcamp
```javascript
{
  title: String,
  cue: Integer,
  description: String
}
```

## Manejo de Errores
La API retorna los siguientes códigos de estado:
- 200: Éxito
- 201: Creado exitosamente
- 400: Error en la solicitud
- 401: No autorizado
- 404: No encontrado
- 500: Error del servidor

## Notas Importantes
- Por defecto, los tokens expiran en 1 minuto (configuración de prueba)
- Para un entorno de producción, se recomienda aumentar el tiempo de expiración (ejemplo: 24h)
- Se requiere renovar el token haciendo login nuevamente después de su expiración
- Los IDs en las URLs deben ser números
- Las relaciones entre usuarios y bootcamps son muchos a muchos
