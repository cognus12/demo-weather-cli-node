export type ArgsMap = Map<string, string | boolean>

export const parseArgs = (argv: string[]): ArgsMap => {
  const args = argv.slice(2)

  return args.reduce((acc, item, idx, arr) => {
    if (item[0] === '-') {
      if (idx === arr.length - 1) {
        acc.set(item.substring(1), true)
        return acc
      }

      if (arr[idx + 1] !== '-') {
        acc.set(item.substring(1), arr[idx + 1])
        return acc
      }

      acc.set(item.substring(1), true)
      return acc
    }
    return acc
  }, new Map() as ArgsMap)
}
