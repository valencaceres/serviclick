CREATE TABLE app.integrationtoken (
	"token" uuid NOT NULL DEFAULT app.gen_random_uuid(),
	createddate timestamp NULL DEFAULT now(),
	integrationuser_id uuid NULL,
	CONSTRAINT integrationtoken_pkey PRIMARY KEY (token)
);