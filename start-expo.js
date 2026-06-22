#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const expoPath = path.join(__dirname, 'node_modules', '.bin', 'expo');
const args = ['start', '--tunnel'];

console.log('Starting Expo with direct node invocation...');

const child = spawn('node', [expoPath, ...args], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('Error starting Expo:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
});
