#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import { Spinner } from 'cli-spinner';
import jetpack from 'fs-jetpack';
import config from '../package.json';
import makeInitCommand from './init';

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

// rig create <path> (example /resources/{id})
//  - parses the path to know which file to create interfaces in
//  - options:
//    + --description, -d "Description of the endpoint."
//    + --get, -G (GET method)
//    + --post, -P (POST method)
//    + --put, -p (PUT method)
//    + --delete, -D (DELETE method)

program.parse(process.argv);
