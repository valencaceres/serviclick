import connection from "../utils/database";

import * as ITicket from "../interfaces/ticket";

const getById = async (id: string): Promise<ITicket.Ticket | null> => {
  const response = await connection.query(`SELECT app.ticket_get_by_id($1)`, [
    id,
  ]);
  return response.rowCount ? response.rows[0].ticket_get_by_id : null;
};

const getByRut = async (rut: string): Promise<ITicket.Ticket | null> => {
  const response = await connection.query(`SELECT app.ticket_get_by_rut($1)`, [
    rut,
  ]);
  return response.rowCount ? response.rows[0].ticket_get_by_rut : null;
};

const upsert = async (
  leadId: string,
  beneficiaryId: string,
  assistanceId: string,
  eventDescription: string,
  scheduledDateFrom: string,
  scheduledDateTo: string,
  scheduledTimeFrom: string,
  scheduledTimeTo: string,
  id: string
): Promise<ITicket.Ticket | null> => {
  const response = await connection.query(
    `SELECT app.ticket_upsert($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      leadId,
      beneficiaryId,
      assistanceId,
      eventDescription,
      scheduledDateFrom,
      scheduledDateTo,
      scheduledTimeFrom,
      scheduledTimeTo,
      id,
    ]
  );
  return response.rowCount ? response.rows[0].ticket_upsert : null;
};

export { getById, getByRut, upsert };
