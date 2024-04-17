CREATE TABLE app.beneficiary (
	id uuid NOT NULL DEFAULT app.gen_random_uuid(),
	rut varchar NOT NULL,
	name varchar NOT NULL,
	paternallastname varchar NOT NULL,
	maternallastname varchar NOT NULL,
	email varchar NOT NULL,
	phone varchar NOT NULL,
	address varchar NULL,
	district varchar NULL,
	birthdate date NULL,
	relationship varchar NULL,
	CONSTRAINT beneficiary_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX beneficiary_rut_idx ON app.beneficiary USING btree (rut);