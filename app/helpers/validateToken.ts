export const validateStringValue = (token: string | boolean) => {
  return !(typeof token !== 'string' || token.length < 1)
}
