import { homedir } from 'os'
import { join } from 'path'

const filePath = join(homedir(), 'weather-data.json')

export const setKeyValue = (key: string, value: string) => {
  const data: any = {}

  data[key] = value

  console.log(filePath)
}
