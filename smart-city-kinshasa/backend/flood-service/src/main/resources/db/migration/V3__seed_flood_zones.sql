INSERT INTO flood_zones(commune,latitude,longitude,name,radius,risk_level) VALUES
('Limete',-4.3920,15.3510,'Kingabwa',900,'TRES_ELEVE'),('Ngaliema',-4.3710,15.2490,'Bas Ngaliema',650,'ELEVE'),
('Kimbanseke',-4.4100,15.4410,'Quartier Mokali',800,'ELEVE'),('Mont Ngafula',-4.4710,15.2740,'Vallée Matadi Mayo',1000,'MOYEN'),
('Kalamu',-4.3575,15.3190,'Zone Yolo',500,'MOYEN');
INSERT INTO flood_alerts(zone_id,message,level,resolved) VALUES (1,'Niveau eau élevé après fortes pluies','DANGER',false),(2,'Surveillance renforcée','WARNING',false);
