export const _getAll = `select id , district_name as name  from app.district`;

export const _getById = `select id , district_name as name  from app.district where id = ($1)`;
