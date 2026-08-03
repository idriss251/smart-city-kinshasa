CREATE TABLE users(id BIGSERIAL PRIMARY KEY, username VARCHAR(80) UNIQUE NOT NULL, email VARCHAR(160) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, role VARCHAR(30) NOT NULL, commune VARCHAR(100), created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now());
INSERT INTO users(username,email,password_hash,role,commune) VALUES
('admin','admin@kinshasa.cd','$2b$12$zIUCPr08Sy5i4KEur0tEXu8oZjNjWBPNjwoyfdHUMqojpvCEZb0yi','ADMIN','Gombe'),
('agent','agent@kinshasa.cd','$2b$12$zIUCPr08Sy5i4KEur0tEXu8oZjNjWBPNjwoyfdHUMqojpvCEZb0yi','AGENT','Limete'),
('citoyen','citoyen@kinshasa.cd','$2b$12$zIUCPr08Sy5i4KEur0tEXu8oZjNjWBPNjwoyfdHUMqojpvCEZb0yi','CITOYEN','Kalamu');
-- Mot de passe de démonstration: 1234
