# Guide de Test de l'Authentification - Smart City Kinshasa

## Vue d'ensemble
Ce guide explique comment tester le système d'authentification pour accéder aux dashboards Admin et Agent.

## Prérequis
- Docker Desktop installé et en cours d'exécution
- Le projet Smart City Kinshasa cloné

## 1. Démarrage des services

```bash
cd c:\smart-city-kinshasa\docker
docker compose up -d
```

Attendre que tous les services soient démarrés (environ 2-3 minutes).

## 2. Accès au frontend

Ouvrez votre navigateur sur: http://localhost:13000

**Note**: Tous les services sont maintenant démarrés avec les corrections suivantes:
- ✅ URL API corrigée (plus de double `/api`)
- ✅ Configuration CORS ajoutée dans l'API Gateway
- ✅ Frontend reconstruit avec les corrections

## 3. Comptes de test

Les comptes suivants sont pré-configurés dans la base de données:

### Compte Administrateur
- **Username**: `admin`
- **Password**: `1234`
- **Rôle**: ADMIN
- **Commune**: Gombe
- **Accès**: Dashboard Admin (/admin)

### Compte Agent
- **Username**: `agent`
- **Password**: `1234`
- **Rôle**: AGENT
- **Commune**: Limete
- **Accès**: Dashboard Agent (/agent)

### Compte Citoyen
- **Username**: `citoyen`
- **Password**: `1234`
- **Rôle**: CITOYEN
- **Commune**: Kalamu
- **Accès**: Dashboard Citoyen (/citizen)

### Compte Décideur
- **Username**: `decideur`
- **Password**: `1234`
- **Rôle**: DECIDEUR
- **Commune**: Kinshasa
- **Accès**: Dashboard Décideur (/decideur)
- **Note**: Ce compte doit être créé via l'interface admin (voir section 9)

## 4. Scénarios de test

### Test 1: Connexion Admin
1. Allez sur http://localhost:13000/login
2. Entrez username: `admin`
3. Entrez password: `1234`
4. Cliquez sur "Entrer"
5. **Résultat attendu**: Redirection automatique vers `/admin`
6. **Vérification**: Vous devriez voir le Dashboard Admin avec:
   - Panneau d'Administration
   - Statistiques système (utilisateurs, signalements, alertes)
   - Santé du système (CPU, Mémoire, Disque, Réseau)
   - Liens vers gestion utilisateurs, services système, configuration

### Test 2: Connexion Agent
1. Déconnectez-vous (cliquez sur logout dans le header)
2. Allez sur http://localhost:13000/login
3. Entrez username: `agent`
4. Entrez password: `1234`
5. Cliquez sur "Entrer"
6. **Résultat attendu**: Redirection automatique vers `/agent`
7. **Vérification**: Vous devriez voir le Dashboard Agent avec:
   - Espace Agent Municipal
   - Zone assignée (Limete)
   - Statistiques d'interventions
   - Liste des interventions assignées
   - Actions rapides (Navigation GPS, Collectes déchets, etc.)

### Test 3: Connexion Citoyen
1. Déconnectez-vous
2. Allez sur http://localhost:13000/login
3. Entrez username: `citoyen`
4. Entrez password: `1234`
5. Cliquez sur "Entrer"
6. **Résultat attendu**: Redirection automatique vers `/citizen`
7. **Vérification**: Vous devriez voir le Dashboard Citoyen

### Test 4: Accès direct aux dashboards (test de sécurité)
1. Connectez-vous en tant que citoyen
2. Essayez d'accéder directement à: http://localhost:13000/admin
3. **Résultat attendu**: Redirection vers `/citizen` (dashboard du rôle actuel)

### Test 5: Token JWT
1. Connectez-vous avec n'importe quel compte
2. Ouvrez les outils de développement du navigateur (F12)
3. Allez dans Application → Local Storage
4. **Vérification**: Vous devriez voir:
   - `token`: Le JWT généré
   - `user`: Les données utilisateur en JSON (id, username, email, role, commune)

## 5. Vérification du backend

### Test de l'API Auth
```bash
# Test login admin
curl -X POST http://localhost:18080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}'

# Réponse attendue:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": 1,
  "username": "admin",
  "email": "admin@kinshasa.cd",
  "role": "ADMIN",
  "commune": "Gombe"
}
```

### Test de l'endpoint /me
```bash
# Utilisez le token obtenu précédemment
curl -X GET http://localhost:18080/api/auth/me \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

## 6. Dépannage

### Problème: "Échec de la connexion"
- Vérifiez que le service auth-service est démarré: `docker compose ps`
- Vérifiez les logs: `docker compose logs auth-service`
- Assurez-vous que la base de données auth-db est accessible

### Problème: Redirection incorrecte
- Vérifiez le localStorage pour voir les données utilisateur stockées
- Le rôle doit être exactement "ADMIN", "AGENT" ou "CITOYEN"
- Effacez le localStorage et reconnectez-vous

### Problème: Dashboard vide
- Vérifiez que le dashboard-service est démarré
- Les données de fallback sont utilisées si l'API n'est pas accessible
- Vérifiez les logs du dashboard-service

### Problème: Port déjà utilisé
- Les ports par défaut sont:
  - Frontend: 13000
  - API Gateway: 18080
  - Eureka: 18761
  - Bases de données: 55433-55439
- Si un port est occupé, modifiez le fichier `.env` dans le dossier docker

## 7. Structure du système d'authentification

### Frontend
- **Login.tsx**: Formulaire de connexion, stockage du token et des données utilisateur
- **AuthContext.tsx**: Contexte React pour gérer l'état d'authentification
- **useAuth.ts**: Hook personnalisé pour accéder au contexte d'authentification
- **App.tsx**: Configuration des routes et redirections basées sur les rôles
- **ProtectedRoute.tsx**: Composant pour protéger les routes nécessitant une authentification

### Backend
- **AuthController.java**: Endpoints REST pour l'authentification
- **AuthServiceImpl.java**: Logique métier (login, register, me)
- **JwtUtil.java**: Génération et validation des tokens JWT
- **SecurityConfig.java**: Configuration Spring Security
- **UserRepository.java**: Accès aux données utilisateurs
- **User.java**: Entité utilisateur avec rôle

### Flux d'authentification
1. Utilisateur soumet le formulaire de login
2. Frontend envoie POST /api/auth/login
3. Backend vérifie les identifiants
4. Backend génère un JWT avec les données utilisateur
5. Frontend stocke le token et les données utilisateur dans localStorage
6. Frontend redirige vers le dashboard approprié selon le rôle
7. Chaque requête API ultérieure inclut le token dans le header Authorization

## 8. Sécurité

- Les mots de passe sont hashés avec BCrypt
- Les tokens JWT expirent après 120 minutes (configurable)
- Les routes sont protégées par vérification du token
- Les rôles sont vérifiés côté frontend pour l'affichage
- Pour la production, ajoutez une vérification des rôles côté backend

## 9. Gestion des utilisateurs (Admin)

Le dashboard Admin inclut maintenant une gestion des utilisateurs avec **données réelles** de la base de données.

### Accès à la gestion des utilisateurs
1. Connectez-vous en tant qu'admin (admin/1234)
2. Cliquez sur "Gérer les utilisateurs" dans le dashboard admin
3. Vous verrez la liste des utilisateurs réels stockés dans la base PostgreSQL

### Fonctionnalités disponibles
- **Lister les utilisateurs**: Affiche tous les utilisateurs de la base de données
- **Rechercher**: Filtrer par username ou email
- **Créer un utilisateur**: Formulaire pour ajouter un nouvel utilisateur avec:
  - Nom d'utilisateur
  - Email
  - Mot de passe
  - Rôle (CITOYEN, AGENT, ADMIN, DECIDEUR)
  - Commune (parmi les communes de Kinshasa)
- **Supprimer un utilisateur**: Bouton pour supprimer un utilisateur avec confirmation

### API Backend
Les endpoints suivants sont disponibles:
- `GET /api/users` - Liste tous les utilisateurs
- `GET /api/users/{id}` - Récupère un utilisateur par ID
- `POST /api/users` - Crée un nouvel utilisateur
- `PUT /api/users/{id}` - Met à jour un utilisateur
- `DELETE /api/users/{id}` - Supprime un utilisateur

### Données réelles
Les utilisateurs sont stockés dans la base PostgreSQL `auth-db` et gérés par:
- **Table**: `users` dans la base `authdb`
- **Migration**: Flyway `V1__create_users_table.sql`
- **Controller**: `UserController.java` dans auth-service
- **Route**: API Gateway route `/api/users/**` vers auth-service

## 10. Conclusion

Le système d'authentification est fonctionnel et permet:
- La connexion avec différents rôles (Admin, Agent, Citoyen)
- La redirection automatique vers le dashboard approprié
- La protection des routes nécessitant une authentification
- La gestion des tokens JWT
- Le stockage sécurisé des données utilisateur
- **La gestion des utilisateurs avec données réelles** de la base PostgreSQL

Pour votre soutenance de Master 1, vous pouvez démontrer:
1. La connexion avec le compte admin
2. L'accès au dashboard admin et ses fonctionnalités
3. La gestion des utilisateurs avec données réelles (CRUD)
4. La connexion avec le compte agent
5. L'accès au dashboard agent et ses fonctionnalités
6. La gestion des rôles et la sécurité basique
