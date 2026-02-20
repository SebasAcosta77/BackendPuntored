PRUEBA TÉCNICA BACKEND – PUNTORED
  Descripción del Proyecto

Este proyecto corresponde al desarrollo del módulo inicial de un portal transaccional para recargas móviles.

Se construyó una API RESTful utilizando NestJS + TypeScript, aplicando principios de:

Domain-Driven Design (DDD)

Ingeniería Segura

Arquitectura por capas

Buenas prácticas de desarrollo backend

El sistema permite:

Autenticación de usuarios mediante JWT

Compra de recargas móviles (con sus respectivas restricciones)

Consulta de historial de transacciones (solo las del usuario logueado)

  Tecnologías Utilizadas

Node.js

NestJS + ExpressJs

TypeScript

TypeORM

PostgreSQL (con Docker)

JWT (Autenticación)

class-validator

Jest (Unit Testing)

Supertest (E2E Testing)

  Arquitectura

El proyecto sigue una estructura inspirada en DDD (Domain-Driven Design):

src/
│
├── domain/          → Entidades y reglas de negocio
├── application/     → Casos de uso
├── infrastructure/  → Controladores, ORM, repositorios
├── auth/            → Autenticación y JWT
├── database/        → Configuración TypeORM y migraciones
Capas:

Domain → Lógica pura de negocio

Application → Orquestación de casos de uso

Infrastructure → HTTP, base de datos, JWT

Database → Persistencia con TypeORM

  Seguridad

Uso de JWT para autenticación

Guards para proteger endpoints

Variables sensibles manejadas con .env

Validación estricta con class-validator

No se usa synchronize en producción

Migraciones para control estructural

⚙️ Configuración del Proyecto
1️⃣ Clonar repositorio
git clone https://github.com/tu-usuario/https://github.com/SebasAcosta77/BackendPuntored
cd tu-repo
2️⃣ Instalar dependencias
npm install
3️⃣ Configurar variables de entorno

Crear archivo .env:

PORT_SERVER=3550

DB_HOST=localhost
DB_PORT=5432
DB_NAME=bd_puntored
DB_USER=user_node
DB_PASSWORD=123456

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1h
  Base de Datos con Docker (PostgreSQL)

Levantar base de datos:

docker compose up -d

El contenedor expone el puerto 5432.

  Ejecutar Proyecto
npm run start:dev

La API estará disponible en:

http://localhost:3550
  Endpoints
  Register
POST /auth/login 
  Login
POST /auth/login

Request

{
  "username": "testuser",
  "password": "password123"
}

Response

{
  "access_token": "JWT_TOKEN"
}
  Comprar Recarga
POST /recharges/buy

Requiere token JWT.

Request

{
  "amount": 5000,
  "phoneNumber": "3101234567"
}

Reglas de negocio

Monto mínimo: 1,000

Monto máximo: 100,000

Número:

Inicia en 3

10 dígitos

Solo números

Response

{
  "id": "uuid",
  "phoneNumber": "3101234567",
  "amount": 5000,
  "userId": "testuser",
  "createdAt": "2026-02-19T14:50:00.000Z"
}
  Historial
GET /recharges/history

Requiere token JWT.

Response

[
  {
    "id": "uuid",
    "phoneNumber": "3101234567",
    "amount": 5000,
    "userId": "testuser",
    "createdAt": "2026-02-19T14:50:00.000Z"
  }
]
  Testing
Unit Tests
npm run test

Incluyen:

Validación de montos

Validación de número telefónico

Casos límite

Tests E2E
npm run test:e2e

Se prueban:

2xx → Casos exitosos

4xx → Errores de validación

401 → Sin token

500 → Errores simulados

  Decisiones Técnicas
1️⃣ Uso de NestJS

Permite arquitectura modular, escalable y estructurada.

2️⃣ Uso de PostgreSQL con Docker

Facilita configuración local, portabilidad y consistencia entre entornos.

3️⃣ Uso de migraciones

Evita riesgos de usar synchronize en producción.

4️⃣ Separación por capas (DDD)

Mejora mantenibilidad, testeo y escalabilidad.

5️⃣ JWT + Guards

Implementación segura para protección de rutas.

🌍 Despliegue

La aplicación está desplegada en:

  https://backendpuntored.onrender.com

  Register
  https://backendpuntored.onrender.com/auth/register

  Login
  https://backendpuntored.onrender.com/auth/login

  Register Recharges
  https://backendpuntored.onrender.com/recharges/buy

  History Recharges
  https://backendpuntored.onrender.com/recharges/history

La base de datos en producción es PostgreSQL gestionada por Render.

  Autor

Juan Sebastian Acosta Quiroz
Ingeniero de Sistemas


  Nivel Alcanzado

Nivel 0 ✅

Nivel 1 ✅

Nivel 2 ✅ (PostgreSQL + Docker)

Nivel 3 ✅ (Testing)

Nivel 4 (Opcional – DDD)

  Conclusión

El sistema cumple los requisitos funcionales solicitados, aplicando principios de seguridad, arquitectura limpia y buenas prácticas de ingeniería backend.