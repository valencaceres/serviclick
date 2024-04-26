CREATE TABLE app.integrationdocument (
	id uuid NOT NULL DEFAULT app.gen_random_uuid(),
	lead_id uuid NULL,
	"document" text NULL,
	CONSTRAINT integrationdocument_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX integrationdocument_lead_id_idx ON app.integrationdocument USING btree (lead_id);