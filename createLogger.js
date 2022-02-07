const winston = require('winston');
const { combine, timestamp, printf, colorize, align } = winston.format;

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const createLogger = (level = 'info') => {
  return winston.createLogger({
    level,
    format: combine(
      colorize({ all: true }),
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console()],
  });
};

//  Default init

module.exports = {
  LOG_LEVELS,
  createLogger,
};
