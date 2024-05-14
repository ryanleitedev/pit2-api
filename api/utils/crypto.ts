import config from '@api/config'
import * as Crypto from 'crypto'

export const sha256 = (input: string) => {
    return Crypto.createHash('sha256').update(config.salt+input).digest('base64')
}

export const encodeHex = (entrada: string) => {
    return Buffer.from(entrada, 'utf8').toString('hex')  
}

export const decodeHex = (entrada: string) => {
    return Buffer.from(entrada, 'utf8').toString('utf8')  
} 