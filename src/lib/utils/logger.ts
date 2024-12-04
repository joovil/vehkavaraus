const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  purple: "\x1b[35m",
  reset: "\x1b[0m",
};

const logGreen = (message: string) => {
  console.log(`${colors.green}%s${colors.reset}`, message);
};

const logRed = (message: string) => {
  console.log(`${colors.red}%s${colors.reset}`, message);
};

const logYellow = (message: string) => {
  console.log(`${colors.yellow}%s${colors.reset}`, message);
};

const database = (message: string) => {
  console.log(`${colors.purple}%s${colors.reset}`, message);
};

const logger = {
  database,
  logGreen,
  logRed,
  logYellow,
};

export default logger;
