#!/usr/bin/env node
import { Command } from 'commander'

import { NAME_CAPITALIZED } from '../common/name'
import { hey } from './commands/hey'

const program = new Command()

program
  .name(NAME_CAPITALIZED)
  .description(`${NAME_CAPITALIZED} CLI`)
  .version('0.0.1')

// -- Hey
program
  .command('hey')
  .description(`Simple textual query to ${NAME_CAPITALIZED}`)
  .argument('<text>', `Text to query ${NAME_CAPITALIZED}`)
  .option('-c, --config <path>', 'path to config file to use')
  .option('--verbose', 'enable verbose output.')
  .action((...args) => {
    hey({ text: args[0] })
  })

program.parse()
