#!/usr/bin/env node
require('module-alias/register');
import { Command } from 'commander';
import { Spinner } from 'cli-spinner';
import config from '../package.json';
import makeInitCommand from './init';
import makeCreateCommand from './create';

Spinner.setDefaultSpinnerString('🕛🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚');

const program = new Command();

/**
 * Create an employee.
 *
 * Resource: `/api/employee`
 *
 * Type: Request
 *
 * Method: POST
 *
 * Success Code: `201`
 */

program.option('-v, --version', 'version of rig').action((args) => {
  if (args.version) {
    console.log(`rig v${config.version}`);
  }
});

// Set up the init command
program.addCommand(makeInitCommand());
program.addCommand(makeCreateCommand());

program.parse(process.argv);
