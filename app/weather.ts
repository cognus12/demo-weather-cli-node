#!/usr/bin/env node
import { parseArgs } from './helpers/parseArgs'
import { printError, printHelp, printSuccess } from './services/log.service'
import { getKeyValue, setKeyValue } from './services/storage.service'
import { getWeather } from './services/api.service'
import { validateStringValue } from './helpers/validateToken'

// TODO clean, delete json

const init = async () => {
  const args = parseArgs(process.argv)

  if (args.has('h')) {
    printHelp()
  }

  if (args.has('c')) {
    console.log(`c: ${args.get('c')}`)
    const city = args.get('c')

    if (!validateStringValue(city)) {
      printError('Invalid city name')
      return
    }

    try {
      await setKeyValue('c', city)
      printSuccess('City saved')
    } catch (e) {
      printError(e.message)
    }
  }

  if (args.has('t')) {
    const token = args.get('t')

    if (!validateStringValue(token)) {
      printError('Invalid token')
      return
    }

    try {
      await setKeyValue('t', token)
      printSuccess('Token saved')
    } catch (e) {
      printError(e.message)
    }
  }

  const city = await getKeyValue('c')

  const w = await getWeather(city as string)
  console.log(w)
}

init()
