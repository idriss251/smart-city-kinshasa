CREATE TABLE collections(id BIGSERIAL PRIMARY KEY, bin_id BIGINT, date TIMESTAMP DEFAULT now(), collected_by VARCHAR(100), quantity DOUBLE PRECISION, notes TEXT);
