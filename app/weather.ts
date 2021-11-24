#!/usr/bin/env node
import { parseArgs } from './helpers/parseArgs'
import { printHelp } from './services/log.service'

const init = () => {
  const args = parseArgs(process.argv)

  if (args.has('h')) {
    printHelp()
  }

  if (args.has('c')) {
    console.log(`h: ${args.get('c')}`)
  }

  if (args.has('t')) {
    console.log(`h: ${args.get('t')}`)
  }
}

init()
