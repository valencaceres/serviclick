CREATE TABLE app."lead" (
	id uuid NOT NULL DEFAULT app.gen_random_uuid(),
	createdate timestamp NOT NULL,
	customer_id uuid NULL,
	company_id uuid NULL,
	subscription_id int4 NULL,
	isactive bool NOT NULL DEFAULT true,
	agent_id uuid NULL,
	paymenttype_code varchar(1) NULL,
	policy_id uuid NULL,
	link varchar NULL,
	user_id varchar NULL,
	enddate date NULL,
	CONSTRAINT lead_pkey PRIMARY KEY (id)
);