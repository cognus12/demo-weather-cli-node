export const validateToken = (token: string | boolean) => {
  return !(typeof token !== 'string' || token.length < 1)
}
