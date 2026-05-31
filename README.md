# 🏨 Hotel & Booking Management API

A robust RESTful API built with **Node.js** and **Express** for managing hotel rooms, occupancy, and guest bookings.
This project follows the **Service-Repository** pattern to ensure clean, testable, and scalable code.

---

## 🚀 Features

- **Room Management:** CRUD operations for Single, Double, and Suite room types.
- **Occupancy Validation:** Logic to ensure total guests (adults + children) do not exceed `maxOccupancy`.
- **Service-Repository Architecture:** Clear separation of concerns for better maintainability.
- **Global Error Handling:** Centralized middleware to handle and format API errors.
- **CORS Enabled:** Configured to allow cross-origin requests from frontend applications.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Environment:** Ubuntu / WebStorm

---

## 📂 Project Structure

```text
── app.js
├── controllers
│   ├── booking.controller.js
│   ├── hotel.controller.js
│   └── room.controller.js
├── LICENSE
├── logs
│   ├── error.log
│   └── message.log
├── models
│   ├── auth.model.js
│   ├── booking.model.js
│   ├── hotel.model.js
│   └── room.model.js
├── package.json
├── package-lock.json
├── readme.md
├── repositories
│   ├── booking.repository.js
│   ├── hotel.repository.js
│   └── room.repository.js
├── routes
│   ├── booking.route.js
│   ├── hotel.route.js
│   └── room.route.js
├── server.js
├── services
│   ├── booking.service.js
│   ├── hotel.service.js
│   └── room.service.js
└── utils
    ├── config.js
    ├── db.js
    ├── loggers
    │   ├── error.js
    │   └── message.js
    └── middlewares
        └── error.middleware.js
```

