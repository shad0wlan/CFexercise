const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m'
};

function log(msg, type = 'info') {
  const prefix = type === 'error' ? colors.red : type === 'success' ? colors.green : colors.yellow;
  console.log(`${prefix}${msg}${colors.reset}`);
}

function checkCommand(cmd, name) {
  try {
    execSync(cmd, { stdio: 'ignore' });
    return true;
  } catch {
    log(`${name} not found`, 'error');
    return false;
  }
}

function run(cmd, dir = '.') {
  try {
    execSync(cmd, { stdio: 'inherit', cwd: dir });
    return true;
  } catch {
    return false;
  }
}

// check prerequisites
log('checking tools...');
const hasNode = checkCommand('node --version', 'Node.js');
const hasDotnet = checkCommand('dotnet --version', '.NET SDK');

if (!hasNode || !hasDotnet) {
  log('install missing tools first', 'error');
  process.exit(1);
}

// backend setup
log('\nsetting up backend...');
if (run('dotnet restore', './backend/api-backend')) {
  log('backend packages installed', 'success');
}

// frontend setup
log('\nsetting up frontend...');
if (run('npm install', './frontend')) {
  log('frontend packages installed', 'success');
}

// env file
const envPath = path.join('frontend', '.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = `API_URL=http://localhost:5213/api
NEXT_PUBLIC_API_URL=http://localhost:5213/api`;
  fs.writeFileSync(envPath, envContent);
  log('.env.local created', 'success');
}

log('\nsetup done', 'success');
log('\nto run:');
log('backend: cd backend/api-backend && dotnet run');
log('frontend: cd frontend && npm run dev');