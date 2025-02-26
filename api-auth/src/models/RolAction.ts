import db from "../utils/database";
import createLogger from "../utils/logger";

import { _removeAction, _assignAction } from "../queries/rolAction";

const assignAction: any = async (id: string, actionId: string) => {
  try {
    createLogger.info({
      model: "rolAction/assignAction",
      input: { id },
    });
    const result = await db.query(_assignAction, [id, actionId]);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

const removeAction: any = async (id: string) => {
  try {
    createLogger.info({
      model: "rolAction/removeAction",
      input: { id },
    });
    const result = await db.query(_removeAction, [id]);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

export { assignAction, removeAction };
