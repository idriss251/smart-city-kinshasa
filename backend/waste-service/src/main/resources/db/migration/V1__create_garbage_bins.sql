CREATE TABLE IF NOT EXISTS garbage_bins (
  id BIGSERIAL PRIMARY KEY, commune VARCHAR(120) NOT NULL, latitude DOUBLE PRECISION, longitude DOUBLE PRECISION,
  created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now(), fill_level INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'ACTIVE', last_collection TIMESTAMP
);
