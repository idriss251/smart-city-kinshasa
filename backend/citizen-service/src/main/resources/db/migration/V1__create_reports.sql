CREATE TABLE IF NOT EXISTS reports (
  id BIGSERIAL PRIMARY KEY, commune VARCHAR(120) NOT NULL, latitude DOUBLE PRECISION, longitude DOUBLE PRECISION,
  created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now(), citizen_id BIGINT, type VARCHAR(40),
  description TEXT, photo_url VARCHAR(255), status VARCHAR(40), resolved_at TIMESTAMP
);
