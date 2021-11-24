#!/usr/bin/env node
import { parseArgs } from './helpers/parseArgs'

const init = () => {
  const args = parseArgs(process.argv)

  console.log(args.entries())
}

init()
