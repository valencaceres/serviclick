export const _selectById = (_id: string) => `
  SELECT * FROM app.partner WHERE id = '${_id}'
`;
