#!/usr/bin/env node
// Generated with Packigician (https://github.com/ez0000001000000/packigician) 
// https://github.com/Packigician

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

program
  .name('beaned-charts')
  .description('Beautiful SVG chart library with advanced color palettes and modern styling')
  .version('2.3.0');

// TODO: Add your commands here
program
  .command('hello')
  .description('Say hello to the world')
  .action(() => {
    console.log('👋 Hello from beaned-charts!');
  });

program.parse();