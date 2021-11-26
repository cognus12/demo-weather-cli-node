import https from 'https'
import { getKeyValue } from './storage.service'
import { validateStringValue } from '../helpers/validateToken'
import { printError } from './log.service'

export const getWeather = (city: string) => {
  return new Promise((resolve, reject) => {
    getKeyValue('t').then((token) => {
      if (!validateStringValue(token)) {
        printError('API key is not provided or is invalid. Use -t [API_KEY]')
        return
      }

      const url = new URL('https://api.openweathermap.org/data/2.5/weather')

      url.searchParams.append('q', city)
      url.searchParams.append('appid', token as string)
      url.searchParams.append('lang', 'ru')
      url.searchParams.append('units', 'metric')

      https.get(url, (response) => {
        let res = ''

        response.on('data', (chunk) => {
          res += chunk
        })

        response.on('end', () => {
          resolve(JSON.parse(res))
        })

        response.on('error', (e) => {
          reject(e)
        })
      })
    })
  })
}
