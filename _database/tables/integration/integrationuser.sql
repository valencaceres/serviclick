CREATE TABLE app.integrationuser (
	id uuid NOT NULL DEFAULT app.gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	hash text NOT NULL,
	retail_id uuid NOT NULL,
	CONSTRAINT integrationuser_email_key UNIQUE (email),
	CONSTRAINT integrationuser_name_key UNIQUE (name),
	CONSTRAINT integrationuser_pkey PRIMARY KEY (id)
);