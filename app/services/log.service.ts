import dedent from 'dedent-js'
import { bgCyan, bgGreen, bgRed } from 'chalk'

export const printHelp = (): void => {
  const output = dedent(`
        ${bgCyan('HELP')}
        No params - print weather
        -h - print help
        -c [CITY] - set city
        -t [TOKEN] - set token
    `)

  console.log(output)
}

export const printError = (msg: string): void => {
  console.log(`${bgRed('ERROR')}: ${msg}`)
}

export const printSuccess = (msg: string): void => {
  console.log(`${bgGreen('SUCCESS')}: ${msg}`)
}
