<div align="center">

# 🚀 BackendPuntored

### Portal Transaccional – Módulo de Recargas Móviles

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

[![Deploy](https://img.shields.io/badge/🌐%20Live%20en-Render-46E3B7?style=for-the-badge)](https://backendpuntored.onrender.com)

</div>

---

## 📋 Descripción del Proyecto

Este proyecto corresponde al desarrollo del módulo inicial de un portal transaccional para **recargas móviles**, desarrollado como prueba técnica backend para **Puntored**.

Se construyó una API RESTful utilizando **NestJS + TypeScript**, aplicando principios de:

- 🧩 Domain-Driven Design (DDD)
- 🔒 Ingeniería Segura
- 🏗️ Arquitectura por capas
- ✅ Buenas prácticas de desarrollo backend

### El sistema permite

| Funcionalidad | Descripción |
|--------------|-------------|
| 🔐 **Autenticación** | Registro e inicio de sesión mediante JWT |
| 📱 **Recargas** | Compra de recargas móviles con restricciones de negocio |
| 📜 **Historial** | Consulta de transacciones del usuario autenticado |

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| **Node.js** | Runtime |
| **NestJS + Express** | Framework principal |
| **TypeScript** | Tipado estático |
| **TypeORM** | ORM para base de datos |
| **PostgreSQL + Docker** | Base de datos relacional |
| **JWT** | Autenticación stateless |
| **class-validator** | Validación de entradas |
| **Jest** | Unit Testing |
| **Supertest** | E2E Testing |

---

## 🏗️ Arquitectura (DDD)

El proyecto sigue una estructura inspirada en **Domain-Driven Design**:

```
src/
│
├── domain/          → Entidades y reglas de negocio
├── application/     → Casos de uso
├── infrastructure/  → Controladores, ORM, repositorios
├── auth/            → Autenticación y JWT
└── database/        → Configuración TypeORM y migraciones
```

| Capa | Responsabilidad |
|------|----------------|
| **Domain** | Lógica pura de negocio |
| **Application** | Orquestación de casos de uso |
| **Infrastructure** | HTTP, base de datos, JWT |
| **Database** | Persistencia con TypeORM |

---

## 🔐 Seguridad

- ✅ Uso de **JWT** para autenticación
- ✅ **Guards** para proteger endpoints
- ✅ Variables sensibles manejadas con `.env`
- ✅ Validación estricta con **class-validator**
- ✅ No se usa `synchronize` en producción
- ✅ **Migraciones** para control estructural

---

## ⚙️ Configuración del Proyecto

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/SebasAcosta77/BackendPuntored.git
cd BackendPuntored
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

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

### 4️⃣ Levantar base de datos con Docker

```bash
docker compose up -d
```

> El contenedor expone PostgreSQL en el puerto `5432`.

### 5️⃣ Ejecutar el proyecto

```bash
npm run start:dev
```

La API estará disponible en: **`http://localhost:3550`**

---

## 🔌 Endpoints

### 🔑 Register

```
POST /auth/register
```

### 🔑 Login

```
POST /auth/login
```

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
  "access_token": "JWT_TOKEN"
}
```

---

### 📱 Comprar Recarga

```
POST /recharges/buy
```
> 🔒 Requiere token JWT

**Request:**
```json
{
  "amount": 5000,
  "phoneNumber": "3101234567"
}
```

**Reglas de negocio:**

| Campo | Validación |
|-------|-----------|
| `amount` | Mínimo `1,000` / Máximo `100,000` |
| `phoneNumber` | Inicia en `3`, exactamente `10 dígitos`, solo números |

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

---

### 📜 Historial de Recargas

```
GET /recharges/history
```
> 🔒 Requiere token JWT

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
- ✅ Validación de montos
- ✅ Validación de número telefónico
- ✅ Casos límite

### Tests E2E

```bash
npm run test:e2e
```

| Código | Escenario |
|--------|-----------|
| `2xx` | Casos exitosos |
| `4xx` | Errores de validación |
| `401` | Sin token |
| `500` | Errores simulados |

---

## 📌 Decisiones Técnicas

| # | Decisión | Justificación |
|---|----------|---------------|
| 1️⃣ | **NestJS** | Arquitectura modular, escalable y estructurada |
| 2️⃣ | **PostgreSQL + Docker** | Portabilidad y consistencia entre entornos |
| 3️⃣ | **Migraciones TypeORM** | Evita riesgos de `synchronize` en producción |
| 4️⃣ | **Arquitectura DDD** | Mejora mantenibilidad, testeo y escalabilidad |
| 5️⃣ | **JWT + Guards** | Implementación segura para protección de rutas |

---

## 🌍 Despliegue

La aplicación está desplegada en **Render** con base de datos PostgreSQL gestionada:

| Endpoint | URL |
|----------|-----|
| 🔑 Register | [`/auth/register`](https://backendpuntored.onrender.com/auth/register) |
| 🔑 Login | [`/auth/login`](https://backendpuntored.onrender.com/auth/login) |
| 📱 Comprar Recarga | [`/recharges/buy`](https://backendpuntored.onrender.com/recharges/buy) |
| 📜 Historial | [`/recharges/history`](https://backendpuntored.onrender.com/recharges/history) |

> **Base URL:** `https://backendpuntored.onrender.com`

---

## 🎯 Niveles Alcanzados

- [x] **Nivel 0** – Configuración base del proyecto
- [x] **Nivel 1** – Endpoints funcionales con validaciones
- [x] **Nivel 2** – PostgreSQL + Docker
- [x] **Nivel 3** – Testing (Unit + E2E)
- [x] **Nivel 4** *(Opcional)* – Arquitectura DDD

---

## 🏁 Conclusión

El sistema cumple los requisitos funcionales solicitados, aplicando principios de **seguridad**, **arquitectura limpia** y **buenas prácticas de ingeniería backend**, garantizando escalabilidad, mantenibilidad y calidad del código.

---

<div align="center">

**👨‍💻 Juan Sebastián Acosta Quiroz** · Ingeniero de Sistemas

[![GitHub](https://img.shields.io/badge/GitHub-SebasAcosta77-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/SebasAcosta77)

*Prueba Técnica Backend · Puntored · 2026*

</div>