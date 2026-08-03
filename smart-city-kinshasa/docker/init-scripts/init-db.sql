CREATE EXTENSION IF NOT EXISTS postgis;
CREATE TABLE IF NOT EXISTS communes (
  id SERIAL PRIMARY KEY, name VARCHAR(80) UNIQUE NOT NULL, population_estimee INT,
  geom GEOGRAPHY(POINT,4326)
);
INSERT INTO communes(name,population_estimee,geom) VALUES
  ('Kinshasa',170000,ST_SetSRID(ST_MakePoint(15.3136,-4.3317),4326)),
  ('Gombe',49000,ST_SetSRID(ST_MakePoint(15.3139,-4.3007),4326)),
  ('Lingwala',95000,ST_SetSRID(ST_MakePoint(15.3047,-4.3203),4326)),
  ('Bandalungwa',202000,ST_SetSRID(ST_MakePoint(15.2817,-4.3417),4326)),
  ('Limete',375000,ST_SetSRID(ST_MakePoint(15.3422,-4.3833),4326)),
  ('Matonge',120000,ST_SetSRID(ST_MakePoint(15.3060,-4.3346),4326)),
  ('Kalamu',315000,ST_SetSRID(ST_MakePoint(15.3119,-4.3550),4326)),
  ('Mont Ngafula',718000,ST_SetSRID(ST_MakePoint(15.2667,-4.4667),4326)),
  ('Ngaliema',683000,ST_SetSRID(ST_MakePoint(15.2389,-4.3650),4326)),
  ('Kimbanseke',946000,ST_SetSRID(ST_MakePoint(15.4369,-4.3981),4326))
ON CONFLICT DO NOTHING;
CREATE INDEX IF NOT EXISTS idx_communes_geom ON communes USING GIST (geom);
