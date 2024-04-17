CREATE TABLE app.payment (
	id uuid NOT NULL DEFAULT app.gen_random_uuid(),
	payment_id int4 NOT NULL,
	"date" timestamp NOT NULL,
	subscription_id int4 NOT NULL,
	amount int4 NOT NULL,
	buy_order varchar NOT NULL,
	credit_card_type varchar NOT NULL,
	is_recurrent bool NOT NULL,
	gateway_response varchar NOT NULL,
	CONSTRAINT payment_pkey PRIMARY KEY (id)
);