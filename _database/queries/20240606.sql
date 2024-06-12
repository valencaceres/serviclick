select distinct 
	concat('insert into app.user(login, clerk_id) values(''', email, ''', ''', user_id, ''');')
from (
	select distinct email, user_id from app.brokeruser where not user_id is null
	union all
	select distinct email, user_id from app.userretail where not user_id is null)

/* Crea todas las queries para crear los usuarios */


select distinct 
	concat('update app.user set clerk_id = ''', user_id, ''' where login = ''', email, ''';')
from (
	select distinct email, user_id from app.brokeruser where not user_id is null
	union all
	select distinct email, user_id from app.userretail where not user_id is null)


/* Crea todas las queries para actualizar los usuarios que quedaron desactualizados */



WITH user_data AS (
    SELECT DISTINCT email, 'retail' AS source
    FROM app.userretail 
    WHERE user_id IS NOT NULL

    UNION ALL

    SELECT DISTINCT email, 'broker' AS source
    FROM app.brokeruser 
    WHERE user_id IS NOT NULL
),
user_roles AS (
    SELECT
        u.email,
        u.source,
        r.id AS rol_id,
        usr.id AS user_id
    FROM
        user_data u
    INNER JOIN app.rol r ON r.name = 'admin'
    INNER JOIN app.user usr ON usr.login = u.email
)
SELECT DISTINCT
    CONCAT(
        'INSERT INTO app.user_rol(user_id, rol_id) VALUES(''', 
        user_id, ''', ''', 
        rol_id, ''');'
    ) AS insert_query
FROM user_roles;



/* Crea todos los user_rol teniendo en cuenta los userretail y brokeruser, con rol de admin */



WITH user_data AS (
    SELECT
        bro.user_id AS user_id,
        bro.email AS email,
        'broker' AS source,
        br.id AS agent_id
    FROM
        app.brokeruser bro
        	inner join app.broker br on bro.broker_id = br.id
    WHERE
        bro.email IS NOT NULL

    UNION ALL

    SELECT
        uret.user_id AS user_id,
        uret.email AS email,
        'retail' AS source,
        ret.id AS agent_id
    FROM
        app.userretail uret
        	inner join app.retail ret on uret.retail_id = ret.id 
    WHERE
        uret.email IS NOT NULL
),
user_roles AS (
    SELECT
        ur.id AS user_rol_id,
        ud.user_id,
        ud.email,
        ud.source,
        ud.agent_id
    FROM
        app.user_rol ur
    INNER JOIN app.user usr ON ur.user_id = usr.id
    INNER JOIN user_data ud ON usr.clerk_id = ud.user_id
)
SELECT DISTINCT
    CONCAT(
        'INSERT INTO app.user_rol_agent(user_rol_id, agent_id) VALUES(''', 
        user_rol_id, ''', ''', 
        agent_id, ''');'
    ) AS insert_query
FROM user_roles;




/* Crea todos los user_rol_agent teniendo en cuenta los user_rol */





WITH user_data AS (
    SELECT
        bro.user_id AS user_id,
        bro.email AS email,
        'broker' AS source,
        bro.id AS agent_id,
        br.name AS agent_name
    FROM
        app.brokeruser bro
        INNER JOIN app.broker br ON bro.broker_id = br.id
    WHERE
        bro.email IS NOT NULL

    UNION ALL

    SELECT
        uret.user_id AS user_id,
        uret.email AS email,
        'retail' AS source,
        uret.retail_id AS agent_id,
        ret.name AS agent_name
    FROM
        app.userretail uret
        INNER JOIN app.retail ret ON uret.retail_id = ret.id
    WHERE
        uret.email IS NOT NULL
),
user_roles AS (
    SELECT
        ur.id AS user_rol_id,
        ud.user_id,
        ud.email,
        ud.source,
        ud.agent_id,
        ud.agent_name
    FROM
        app.user_rol ur
    INNER JOIN app.user usr ON ur.user_id = usr.id
    INNER JOIN user_data ud ON usr.clerk_id = ud.user_id
)
UPDATE app.user_rol_agent
SET channel_code = CASE
                        WHEN ud.source = 'retail' THEN 'retail'
                        WHEN ud.source = 'broker' THEN 'broker'
                    END
FROM user_roles ud
WHERE app.user_rol_agent.user_rol_id = ud.user_rol_id;





/* Actualiza la tabla user_rol_agent para añadir al campo channel_code los codigos de broker o retail respectivamente */



