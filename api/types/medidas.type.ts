import { BaseType } from './base.type'
import { ClienteType } from './cliente.type'

export type MedidasType = BaseType & {
  clienteId: number
  circunferenciaPescoco: number
  circunferenciaQuadril: number
  circunferenciaCintura: number
  valorBf: number
  valorImc: number
  altura: number
  peso: number
  cliente: ClienteType
}
