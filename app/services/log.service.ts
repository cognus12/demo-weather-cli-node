import dedent from 'dedent-js'
import { bgCyan } from 'chalk'

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
