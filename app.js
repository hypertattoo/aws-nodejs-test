const app = require('express')();
const { createLogger, LOG_LEVELS } = require('./createLogger');
let loggerLevel = 'info';
const logger = createLogger('info');
//  Simple route to check status
app.get('/', (req, res) => {
  res.send('Hello, HyperTattoo V2!');
});

app.get('/logger/test', (req, res) => {
  const localLogger = createLogger(loggerLevel);
  localLogger.info('Info message');
  localLogger.error('Error message');
  localLogger.warn('Warning message');
  localLogger.http('http message');
  localLogger.verbose('verbose message');
  localLogger.debug('debug message');
  localLogger.silly('silly message');
  res.send('Testing log level');
});

app.get('/logger/level/:logLevel', (req, res) => {
  const { logLevel } = req.params;
  if (!(logLevel in LOG_LEVELS)) {
    res.send('Invalid log level');
  }
  loggerLevel = logLevel;
  const message = `Set log level to:${logLevel}`;
  createLogger(logLevel);
  logger.info(message);
  res.send(message);
});

app.listen(3000, '0.0.0.0');
