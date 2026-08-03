CREATE TABLE flood_alerts(id BIGSERIAL PRIMARY KEY, zone_id BIGINT, message TEXT, level VARCHAR(30), date TIMESTAMP DEFAULT now(), resolved BOOLEAN DEFAULT false);
