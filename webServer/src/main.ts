import { app, port } from "./server";
import { createLogger, transports, format } from "winston";

export const logger = createLogger({
    format: format.json(),
    transports: [new transports.Console({ format: format.simple() })],
});

app.listen(port, () => {
    logger.info(`Listening on port: ${port}...`);
});
