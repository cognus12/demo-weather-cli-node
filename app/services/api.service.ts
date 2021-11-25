import https from 'https'
import { getKeyValue } from './storage.service'
import { validateToken } from '../helpers/validateToken'

export const getWeather = (city: string) => {
  return new Promise((resolve, reject) => {
    getKeyValue('t').then((token) => {
      if (!validateToken(token)) {
        throw new Error('API key is not provided or is invalid. Use -t [API_KEY]')
      }

      const url = new URL('https://api.openweathermap.org/data/2.5/weather')

      url.searchParams.append('q', city)
      url.searchParams.append('appid', token as string)
      url.searchParams.append('lang', 'en')
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
