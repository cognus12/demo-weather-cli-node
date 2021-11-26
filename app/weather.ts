#!/usr/bin/env node
import { parseArgs } from './helpers/parseArgs'
import { printError, printHelp, printSuccess, printWeather } from './services/log.service'
import { getKeyValue, setKeyValue } from './services/storage.service'
import { getWeather } from './services/api.service'
import { validateStringValue } from './helpers/validateToken'

// TODO clean, delete json

const run = async () => {
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

  if (!city) {
    printError('City is not specified - use -c [CITY]')
    return
  }

  try {
    const weather = await getWeather(city as string)
    printWeather(weather)
  } catch (e) {
    printError(e.message)
  }
}

run()
