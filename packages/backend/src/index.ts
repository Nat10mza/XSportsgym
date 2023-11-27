import app from "./app";
import { expressPort } from "./config";
import logger from "./utils/logger";

app.listen(expressPort, () => {
  logger.info(`Server listening on port ${expressPort}`);
});
