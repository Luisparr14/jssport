import {hash, compare, genSalt} from 'bcryptjs'

const saltRounds = 10

const generarHash = async (password) => {
  const salt = await genSalt(saltRounds)
  const newHash = await hash(password, salt)
  return newHash
}

const compararContrasena = async (password, hash) => {
  const result = await compare(password, hash)
  return result
}

export {
  generarHash,
  compararContrasena
}