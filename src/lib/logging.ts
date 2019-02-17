import * as config from "config";
import * as debug from "debug";
import { join } from "path";
import * as pino from "pino";

export default class Logger {
    public lib: pino.Logger;

    constructor() {
        this.lib = pino({
            level: process.env.LEVEL || "info",
            prettyPrint: config.get("logging.file")
                ? false : true,
        }, config.get("logging.file")
                ? pino.destination(join(__dirname, "app.log")) : undefined);
    }

    public static debugLogger(namespace: string): debug.Debugger {
        return debug(namespace);
    }
}
