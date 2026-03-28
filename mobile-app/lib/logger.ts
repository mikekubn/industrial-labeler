type Logger = {
  error: (message: string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
};

const createLogger = (): Logger => ({
  error: (message) => {
    console.error(message);
  },
  warn: (message) => {
    console.warn(message);
  },
  info: (message) => {
    console.info(message);
  },
  debug: (message) => {
    console.debug(message);
  }
});

let logger: Logger | undefined;

const getLogger = (): Logger => {
  if (!logger) {
    logger = createLogger();
  }
  return logger;
};

export { getLogger, type Logger };
