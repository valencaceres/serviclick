CREATE TABLE app.district (
	id uuid NOT NULL DEFAULT app.gen_random_uuid(),
	region_number int4 NOT NULL,
	region_name varchar NOT NULL,
	province_name varchar NOT NULL,
	district_name varchar NOT NULL,
	CONSTRAINT district_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX district_name_idx ON app.district USING btree (district_name);