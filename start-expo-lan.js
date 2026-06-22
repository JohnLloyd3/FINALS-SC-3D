#!/usr/bin/env node
const { exec } = require('child_process');
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal && !name.includes('Virtual')) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const localIP = getLocalIP();
console.log(`Starting Expo on IP: ${localIP}`);

// Set environment variable for the IP
process.env.METRO_LISTEN_ADDRESS = localIP;
process.env.EXPO_DEVSERVER_HOST = localIP;

// Start expo with lan mode
const child = exec(`npx expo start --lan`, {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code);
});
