import db from "../utils/database";
import createLogger from "../utils/logger";

import { _assignRol, _removeRol } from "../queries/userRol";

const assignRol: any = async (id: string) => {
  try {
    createLogger.info({
      model: "userRol/assignRol",
      input: { id },
    });
    const result = await db.query(_assignRol);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const removeRol: any = async (id: string, rolId: string) => {
  try {
    createLogger.info({
      model: "userRol/removeRol",
      input: { id, rolId },
    });
    const result = await db.query(_removeRol, [id, rolId]);
    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

export { assignRol, removeRol };
