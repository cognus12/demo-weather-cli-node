#!/usr/bin/env node
import { parseArgs } from './helpers/parseArgs'
import { printHelp } from './services/log.service'
import { setKeyValue } from './services/storage.service'

const init = () => {
  const args = parseArgs(process.argv)

  if (args.has('h')) {
    printHelp()
  }

  if (args.has('c')) {
    console.log(`c: ${args.get('c')}`)
  }

  if (args.has('t')) {
    setKeyValue()
    console.log(`t: ${args.get('t')}`)
  }
}

init()
