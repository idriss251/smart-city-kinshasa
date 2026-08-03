# Smart City Kinshasa
Prototype académique Master 1 d'une plateforme intelligente de gestion des services urbains pour Kinshasa.
## Modules
Backend Spring Boot, API Gateway, Eureka, PostgreSQL/PostGIS, Redis, RabbitMQ, Mosquitto, frontend React, mobile Flutter et simulation IoT Python.
## Démarrage rapide
```bash
cd docker
docker compose --env-file .env up --build
```
Frontend Docker: http://localhost:13000, Gateway: http://localhost:18080, Eureka: http://localhost:18761.
Frontend dev Vite: http://localhost:3000 (ou le prochain port libre si 3000 est occupe).
Identifiants: admin/password, agent/password, citoyen/password.
