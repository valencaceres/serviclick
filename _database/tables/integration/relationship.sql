CREATE TABLE app.relationship (
	id uuid NOT NULL DEFAULT app.gen_random_uuid(),
	"name" varchar NOT NULL
);
CREATE UNIQUE INDEX relationship_idx ON app.relationship USING btree (name);