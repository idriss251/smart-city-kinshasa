# Guide de déploiement sur Render

## Prérequis

- Compte Render (https://render.com)
- Repository GitHub connecté à Render
- Compte GitHub avec le projet `smart-city-kinshasa`

## Étape 1: Connecter le repository à Render

1. Allez sur https://dashboard.render.com
2. Cliquez sur "New +"
3. Sélectionnez "Web Service"
4. Connectez votre compte GitHub si ce n'est pas déjà fait
5. Sélectionnez le repository `idriss251/smart-city-kinshasa`

## Étape 2: Déploiement avec render.yaml

Render supporte le déploiement multi-services via le fichier `render.yaml`.

### Option A: Déploiement automatique (recommandé)

1. Le fichier `render.yaml` est déjà configuré dans le repository
2. Render détectera automatiquement le fichier et proposera de déployer tous les services
3. Cliquez sur "Yes" pour accepter le déploiement multi-services

### Option B: Déploiement manuel de chaque service

Si Render ne détecte pas automatiquement le fichier, déployez manuellement:

#### 1. Eureka Server (d'abord)
- Name: `smart-city-eureka`
- Environment: Docker
- Docker Context: `./backend/eureka-server`
- Dockerfile Path: `./backend/eureka-server/Dockerfile`
- Plan: Free
- Region: Oregon
- Environment Variables:
  - `SPRING_PROFILES_ACTIVE`: `prod`

#### 2. API Gateway
- Name: `smart-city-api-gateway`
- Environment: Docker
- Docker Context: `./backend/api-gateway`
- Dockerfile Path: `./backend/api-gateway/Dockerfile`
- Plan: Free
- Region: Oregon
- Environment Variables:
  - `EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE`: `http://smart-city-eureka.onrender.com/eureka/`
  - `SPRING_PROFILES_ACTIVE`: `prod`

#### 3. Auth Service
- Name: `smart-city-auth-service`
- Environment: Docker
- Docker Context: `./backend/auth-service`
- Dockerfile Path: `./backend/auth-service/Dockerfile`
- Plan: Free
- Region: Oregon
- Environment Variables:
  - `EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE`: `http://smart-city-eureka.onrender.com/eureka/`
  - `SPRING_PROFILES_ACTIVE`: `prod`
  - `SPRING_DATASOURCE_URL`: (depuis la base de données)
  - `SPRING_DATASOURCE_USERNAME`: (depuis la base de données)
  - `SPRING_DATASOURCE_PASSWORD`: (depuis la base de données)
  - `JWT_SECRET`: (généré automatiquement)

#### 4. Bases de données PostgreSQL
Créez 5 bases de données PostgreSQL:
- `smart-city-auth-db` (database: authdb)
- `smart-city-waste-db` (database: wastedb)
- `smart-city-road-db` (database: roaddb)
- `smart-city-flood-db` (database: flooddb)
- `smart-city-dashboard-db` (database: dashboarddb)

#### 5. Autres services (Waste, Road, Flood, Dashboard)
Déployez de la même manière que l'Auth Service avec leurs bases de données respectives.

#### 6. Frontend
- Name: `smart-city-frontend`
- Environment: Docker
- Docker Context: `./frontend/web`
- Dockerfile Path: `./frontend/web/Dockerfile`
- Plan: Free
- Region: Oregon
- Environment Variables:
  - `VITE_API_URL`: `https://smart-city-api-gateway.onrender.com/api`

## Étape 3: Initialisation des bases de données

Après le déploiement, vous devez exécuter les migrations Flyway:

1. Accédez aux logs de chaque service
2. Vérifiez que les tables sont créées automatiquement par Flyway
3. Si nécessaire, exécutez les scripts SQL manuellement via pgAdmin

## Étape 4: Création des utilisateurs par défaut

Connectez-vous à la base de données `authdb` et exécutez:

```sql
INSERT INTO users(username, email, password_hash, role, commune) VALUES
('admin', 'admin@kinshasa.cd', '$2b$12$zIUCPr08Sy5i4KEur0tEXu8oZjNjWBPNjwoyfdHUMqojpvCEZb0yi', 'ADMIN', 'Gombe'),
('agent', 'agent@kinshasa.cd', '$2b$12$zIUCPr08Sy5i4KEur0tEXu8oZjNjWBPNjwoyfdHUMqojpvCEZb0yi', 'AGENT', 'Limete'),
('citoyen', 'citoyen@kinshasa.cd', '$2b$12$zIUCPr08Sy5i4KEur0tEXu8oZjNjWBPNjwoyfdHUMqojpvCEZb0yi', 'CITOYEN', 'Kalamu');
```

Mot de passe pour tous: `1234`

## Étape 5: Vérification du déploiement

1. Vérifiez que tous les services sont "Live" dans le dashboard Render
2. Testez l'API Gateway: `https://smart-city-api-gateway.onrender.com/api/auth/login`
3. Testez le frontend: `https://smart-city-frontend.onrender.com`

## Limitations du plan Free

- Les services free s'arrêtent après 15 minutes d'inactivité
- Redémarrage automatique lors d'une nouvelle requête (peut prendre 30-60 secondes)
- Pas de support Redis/RabbitMQ sur le plan free (services désactivés)
- Bases de données PostgreSQL limitées à 90 jours d'inactivité

## Pour un déploiement de production

Considérez les plans payants Render pour:
- Services toujours actifs
- Support Redis et RabbitMQ
- Plus de ressources CPU/RAM
- SSL personnalisé
- Domaine personnalisé

## Résolution de problèmes

### Services ne se connectent pas à Eureka
- Vérifiez que l'Eureka Server est déployé en premier
- Vérifiez les variables d'environnement `EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE`
- Consultez les logs Render pour les erreurs de connexion

### Erreur 502 Bad Gateway
- Vérifiez que tous les services sont "Live"
- Consultez les logs du service concerné
- Vérifiez les connexions aux bases de données

### Frontend ne peut pas contacter l'API
- Vérifiez la variable `VITE_API_URL`
- Vérifiez que l'API Gateway est accessible
- Consultez les logs du frontend et de l'API Gateway
