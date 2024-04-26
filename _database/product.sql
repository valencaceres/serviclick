CREATE TABLE app.product (
	id uuid NOT NULL DEFAULT app.gen_random_uuid(),
	family_id uuid NOT NULL,
	"name" varchar NOT NULL,
	"cost" int4 NOT NULL,
	customerprice int4 NULL,
	companyprice int4 NULL,
	issubject bool NOT NULL,
	frequency varchar NOT NULL,
	term varchar NOT NULL,
	isactive bool NOT NULL DEFAULT true,
	beneficiaries int4 NOT NULL DEFAULT 0,
	currency varchar(1) NOT NULL DEFAULT 'P'::character varying,
	mininsuredcompanyprice int4 NULL,
	dueday int4 NULL,
	dynamiccharge int4 NULL DEFAULT 0,
	CONSTRAINT product_pkey PRIMARY KEY (id)
);