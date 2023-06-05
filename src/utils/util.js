import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default __dirname


export const hasData = async (data) => {
    return bcrypt.hash(data, 10)
}

export const compareData = async(data, dataDB) => {
    return bcrypt.compare(data, dataDB)
}