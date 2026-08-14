# Déploiement sur Render.com

## Prérequis
1. Compte Render : https://dashboard.render.com/
2. Repo GitHub : `idriss251/smart-city-kinshasa` (déjà pushé)

## Méthode : Render Blueprint

1. Allez sur **Blueprint** dans le dashboard Render.
2. Cliquez sur **New Blueprint Instance**.
3. Connectez le repo `idriss251/smart-city-kinshasa`.
4. Sélectionnez la branche `main`.
5. Render va lire le fichier `render.yaml` à la racine et créer automatiquement :
   - PostgreSQL : `authdb`, `wastedb`, `roaddb`, `flooddb`, `dashboarddb`, `citizendb`
   - Web services : API Gateway, Eureka, Auth, Better Auth, Waste, Road, Flood, Dashboard, Citizen, Frontend
6. Les URLs finales seront du type `https://smart-city-xxx.onrender.com`.

## Variables importantes
- Le **frontend** utilise `VITE_API_URL=https://smart-city-api-gateway.onrender.com/api`.
- Le **better-auth-service** attend `BETTER_AUTH_URL=https://smart-city-api-gateway.onrender.com/api/betterauth`.
- Les **microservices Java** s'enregistrent sur `http://smart-city-eureka.onrender.com/eureka/`.

## Notes
- Le plan **free** ne permet qu'un service web actif à la fois. Pour tout déployer, il faudra passer en plan payant ou déployer uniquement les services essentiels.
- Si vous voulez réduire la taille, retirez les services non essentiels du `render.yaml` avant de créer l'instance.

## Après déploiement
1. Créez la base de données `authdb` et `citizendb` si Render ne l'a pas fait.
2. Vérifiez que les services arrivent à communiquer via Eureka.
3. Mettez à jour `BETTER_AUTH_TRUSTED_ORIGINS` avec l'URL réelle du frontend.
