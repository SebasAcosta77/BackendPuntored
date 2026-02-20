<div align="center">

# 🚀 BackendPuntored

### Portal Transaccional – Módulo de Recargas Móviles

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

[![Deploy](https://img.shields.io/badge/🌐%20Deployed%20on-Render-46E3B7?style=for-the-badge)](https://backendpuntored.onrender.com)

</div>

---

## 📋 Descripción

API RESTful desarrollada con **NestJS + TypeScript** como prueba técnica backend para **Puntored**. El sistema implementa un módulo de recargas móviles con autenticación JWT, aplicando principios de **Domain-Driven Design (DDD)**, arquitectura por capas e ingeniería segura.

### ✅ Funcionalidades

| Módulo | Descripción |
|--------|-------------|
| 🔐 **Autenticación** | Login con JWT, guards en endpoints protegidos |
| 📱 **Recargas** | Compra de recargas con validaciones de negocio |
| 📜 **Historial** | Consulta de transacciones del usuario autenticado |

---

## 🏗️ Arquitectura (DDD)

```
src/
├── domain/           # Entidades y reglas de negocio puras
├── application/      # Casos de uso y orquestación
├── infrastructure/   # Controladores, ORM y repositorios
├── auth/             # Autenticación y JWT
└── database/         # Configuración TypeORM y migraciones
```

| Capa | Responsabilidad |
|------|----------------|
| **Domain** | Lógica pura de negocio, sin dependencias externas |
| **Application** | Orquestación de casos de uso |
| **Infrastructure** | HTTP, persistencia, JWT |
| **Database** | Configuración y migraciones con TypeORM |

---

## 🛠️ Tecnologías

- **Runtime:** Node.js
- **Framework:** NestJS + Express
- **Lenguaje:** TypeScript
- **ORM:** TypeORM
- **Base de datos:** PostgreSQL (Docker local / Render producción)
- **Auth:** JWT + Guards
- **Validación:** class-validator
- **Testing:** Jest (unit) + Supertest (E2E)

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/SebasAcosta77/BackendPuntored.git
cd BackendPuntored
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT_SERVER=3550

DB_HOST=localhost
DB_PORT=5432
DB_NAME=bd_puntored
DB_USER=user_node
DB_PASSWORD=123456

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1h
```

### 4. Levantar base de datos con Docker

```bash
docker compose up -d
```

> El contenedor expone PostgreSQL en el puerto `5432`.

### 5. Ejecutar el proyecto

```bash
npm run start:dev
```

La API estará disponible en: **http://localhost:3550**

---

## 🔌 Endpoints

### 🔑 Autenticación

#### `POST /auth/login`

**Request:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 📱 Comprar Recarga

#### `POST /recharges/buy` 🔒 *Requiere JWT*

**Request:**
```json
{
  "amount": 5000,
  "phoneNumber": "3101234567"
}
```

**Response:**
```json
{
  "id": "uuid",
  "phoneNumber": "3101234567",
  "amount": 5000,
  "userId": "testuser",
  "createdAt": "2026-02-19T14:50:00.000Z"
}
```

**Reglas de negocio:**
- 💰 Monto mínimo: `1,000` | Monto máximo: `100,000`
- 📞 El número debe iniciar en `3`, tener exactamente `10 dígitos` y ser solo numérico

---

### 📜 Historial de Recargas

#### `GET /recharges/history` 🔒 *Requiere JWT*

**Response:**
```json
[
  {
    "id": "uuid",
    "phoneNumber": "3101234567",
    "amount": 5000,
    "userId": "testuser",
    "createdAt": "2026-02-19T14:50:00.000Z"
  }
]
```

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

Cobertura:
- ✅ Validación de montos (mínimo y máximo)
- ✅ Validación de número telefónico
- ✅ Casos límite

### Tests E2E

```bash
npm run test:e2e
```

Casos cubiertos:
- ✅ `2xx` → Flujos exitosos
- ✅ `4xx` → Errores de validación
- ✅ `401` → Acceso sin token
- ✅ `500` → Errores controlados

---

## 🌍 Despliegue en Producción

La aplicación está desplegada en **Render** con base de datos PostgreSQL gestionada.

| Endpoint | URL |
|----------|-----|
| Login | `POST https://backendpuntored.onrender.com/auth/login` |
| Comprar recarga | `POST https://backendpuntored.onrender.com/recharges/buy` |
| Historial | `GET https://backendpuntored.onrender.com/recharges/history` |

---

## 🔐 Seguridad

- **JWT** para autenticación stateless
- **Guards** en todos los endpoints protegidos
- **Variables sensibles** gestionadas con `.env` (nunca en el repositorio)
- **class-validator** para validación estricta de entrada
- **Sin `synchronize` en producción** — control estructural con migraciones

---

## 📌 Decisiones Técnicas

| Decisión | Justificación |
|----------|---------------|
| **NestJS** | Arquitectura modular, escalable y con soporte nativo para DDD |
| **PostgreSQL + Docker** | Consistencia entre entornos y facilidad de configuración local |
| **Migraciones TypeORM** | Evita riesgos de `synchronize: true` en producción |
| **Arquitectura DDD** | Mejora mantenibilidad, escalabilidad y testabilidad |
| **JWT + Guards** | Protección robusta y desacoplada de los endpoints |

---

## 🎯 Niveles Alcanzados

- [x] **Nivel 0** – Configuración base y estructura del proyecto
- [x] **Nivel 1** – Endpoints funcionales con validaciones
- [x] **Nivel 2** – PostgreSQL + Docker
- [x] **Nivel 3** – Testing (Unit + E2E)
- [x] **Nivel 4** – Arquitectura DDD

---

## 👨‍💻 Autor

**Juan Sebastián Acosta Quiroz**  
Ingeniero de Sistemas

[![GitHub](https://img.shields.io/badge/GitHub-SebasAcosta77-181717?style=flat-square&logo=github)](https://github.com/SebasAcosta77)

---

<div align="center">

*Desarrollado como prueba técnica para **Puntored** · 2026*

</div>