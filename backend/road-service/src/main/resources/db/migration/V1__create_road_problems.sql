CREATE TABLE IF NOT EXISTS road_problems (
  id BIGSERIAL PRIMARY KEY, commune VARCHAR(120) NOT NULL, latitude DOUBLE PRECISION, longitude DOUBLE PRECISION,
  created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now(), type VARCHAR(40), severity VARCHAR(40),
  description TEXT, photo_url VARCHAR(255), status VARCHAR(40)
);
