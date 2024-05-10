--para todo lo que tiene que ver con rol --
CREATE TABLE app.rol (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code varchar NOT NULL,
    name varchar NOT NULL,
    createdAt timestamp,
    updatedAt timestamp,
    deletedAt timestamp,
    CONSTRAINT rol_pkey PRIMARY KEY (id),
    CONSTRAINT rol_code_unique UNIQUE (code) 
);


CREATE TABLE app.rol_action (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    rol_id UUID NOT NULL,
    action_id UUID NOT NULL,
    createdAt TIMESTAMP,
    deletedAt TIMESTAMP,
    CONSTRAINT rol_action_pkey PRIMARY KEY (id),
    CONSTRAINT rol_action_unique_constraint UNIQUE (rol_id, action_id)
);



--para todo lo que tiene que ver con action--


CREATE TABLE app.action (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    code VARCHAR NOT NULL,
    application_id UUID NOT NULL,
    description VARCHAR NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    deletedAt TIMESTAMP,
    CONSTRAINT action_pkey PRIMARY KEY (id),
    CONSTRAINT action_code_unique UNIQUE (code)
);




---lo relacionado a application---

CREATE TABLE app.application (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    code VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    createdat TIMESTAMP NULL,
    updatedat TIMESTAMP NULL,
    deletedAt TIMESTAMP,
    CONSTRAINT application_pkey PRIMARY KEY (id),
    CONSTRAINT application_code_unique_constraint UNIQUE (code)
);


--lo relacionado con person--

ALTER TABLE app.person
ADD COLUMN district_id uuid;
ADD COLUMN createdAt timestamp,
ADD COLUMN updatedAt timestamp,
ADD COLUMN deletedAt timestamp;


---lo que tiene que ver con user--
DROP TABLE IF EXISTS app.user_rol;


CREATE TABLE app.user_rol (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    rol_id uuid NOT NULL,
    user_id uuid NOT NULL,
    createdat timestamp NULL,
    deletedat timestamp NULL,
    CONSTRAINT user_rol_pkey PRIMARY KEY (id),
    CONSTRAINT unique_user_rol UNIQUE (user_id, rol_id)
);


ALTER TABLE app."user" 
ADD COLUMN createdAt timestamp,
ADD COLUMN updatedAt timestamp,
ADD COLUMN deletedAt timestamp;










