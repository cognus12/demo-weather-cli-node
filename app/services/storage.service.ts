import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json')

type Value = string | boolean

interface StorageData {
  [key: string]: Value
}

const isExist = async (path: string): Promise<boolean> => {
  try {
    await promises.stat(path)
    return true
  } catch (e) {
    return false
  }
}

const read = async (path: string): Promise<StorageData> => {
  const file = await promises.readFile(path)

  return JSON.parse(file.toString())
}

const write = async (path: string, data: string) => {
  await promises.writeFile(path, data)
}

export const setKeyValue = async (key: string, value: Value): Promise<void> => {
  const data: StorageData = {}

  if (await isExist(filePath)) {
    const fileContent = await read(filePath)
    Object.assign(data, fileContent)
  }

  data[key] = value

  await write(filePath, JSON.stringify(data))
}

export const getKeyValue = async (key: string): Promise<Value | undefined> => {
  if (await isExist(filePath)) {
    const fileData = await read(filePath)

    return fileData[key]
  }
}
