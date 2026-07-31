const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Ensure logs directory exists
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create a write stream (in append mode) for access logs
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), {
  flags: 'a',
});

// Morgan middleware: logs to console in dev, to file always
const morganMiddleware = (env) => {
  const format = env === 'production' ? 'combined' : 'dev';
  return [morgan(format), morgan('combined', { stream: accessLogStream })];
};

module.exports = { morganMiddleware, logDir };
