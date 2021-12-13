# rest-interface-generator (rig)

A CLI tool for generating TypeScript interfaces for rest API's. Once installed you can use it with the `rig` command.

## Installation

```bash
npm install -g rest-interface-generator
```

## Project Setup

After you have installed **rest-interface-generator (aka. "rig")** you should now be able to use the `rig` command in your terminal.

Before you can start generating TypeScript interfaces with rig you must first initialize it with your project.

```bash
rig init
```

This will prompt you to select the location your TypeScript interfaces will be written to. It will write this configuration to a `.rig.json` file at the root of your project. You should commit this file as it will allow other team members to skip initialization.

## Creating Interfaces

To begin creating a TypeScript interface for describing your RESTful API's begin using the following command:

```bash
rig create
```
