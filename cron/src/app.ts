import createLogger from "./util/logger";

import * as Cron from "./controllers/cron";

class App {
  constructor() {
    createLogger.info({
      function: `constructor()`,
      error: null,
    });
  }

  async execute() {
    createLogger.info({
      function: `execute()`,
      error: null,
    });

    const responseCron = await Cron.process();
  }
}

export default new App();
