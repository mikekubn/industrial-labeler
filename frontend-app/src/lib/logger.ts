import { isProduction } from "./environmental";

class Logger {
  private static logPrefix = "[LOG]";
  private static infoPrefix = "[INFO]";
  private static warnPrefix = "[WARN]";
  private static errorPrefix = "[ERROR]";

  private static format(prefix: string, message: string) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] - ${prefix} - ${message}`;
  }

  public log(message: string) {
    if (isProduction) {
      return;
    }

    const output = Logger.format(Logger.logPrefix, message);
    console.log(output);
  }

  public info(message: string) {
    const output = Logger.format(Logger.infoPrefix, message);
    console.info(output);
  }

  public warn(message: string) {
    const output = Logger.format(Logger.warnPrefix, message);
    console.warn(output);
  }

  public error(e: string | unknown | Error) {
    if (e instanceof Error) {
      const output = Logger.format(Logger.errorPrefix, e.message);

      console.error(output);
      return;
    }

    const err = new Error(String(e));
    const output = Logger.format(Logger.errorPrefix, err.message);

    console.error(output);
  }
}

let loggerInstance: Logger | null = null;

/**
 * Get the singleton Logger instance.
 * In production, `log` and `warn` are suppressed; `error` always logs.
 * @returns Logger The singleton logger instance.
 */
const getLogger = () => {
  if (!loggerInstance) {
    loggerInstance = new Logger();
  }
  return loggerInstance;
};

export { getLogger };
