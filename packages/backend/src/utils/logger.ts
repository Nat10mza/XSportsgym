import { createLogger, format, transports } from "winston";

const level = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "development" ? "debug" : "info";
};

const logger = createLogger({
  level: level(),
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  format: format.combine(
    format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.colorize({
      colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        http: "magenta",
        debug: "white",
      },
    }),
    format.printf(
      ({ level, message, timestamp }) => `[${timestamp}] [${level}]: ${message}`
    )
  ),
  transports: [new transports.Console()],
});

export default logger;
