#!/usr/bin/env node
import { parseArgs } from './helpers/parseArgs'
import { printError, printHelp, printSuccess } from './services/log.service'
import { setKeyValue } from './services/storage.service'
import { getWeather } from './services/api.service'
import { validateToken } from './helpers/validateToken'

// TODO clean, delete json

const init = async () => {
  const args = parseArgs(process.argv)

  if (args.has('h')) {
    printHelp()
  }

  if (args.has('c')) {
    console.log(`c: ${args.get('c')}`)
  }

  if (args.has('t')) {
    const token = args.get('t')

    if (!validateToken(token)) {
      printError('Invalid token')
      return
    }

    try {
      await setKeyValue('t', args.get('t'))
      printSuccess('Token saved')
    } catch (e) {
      printError(e.message)
    }
  }

  const w = await getWeather('Vladimir')
  console.log(w)
}

init()
