import { BaseType } from './base.type'
import { ClienteType } from './cliente.type'

export type MedidasType = BaseType & {
  clienteId: number
  circunferenciaPescoco: number
  circunferenciaOmbro: number
  circunferenciaPeitoral: number
  circunferenciaQuadril: number
  circunferenciaCintura: number
  circunferenciaAbdomen: number
  circunferenciaBracoDireito: number
  circunferenciaBracoEsquerdo: number
  circunferenciaAntebracoDireito: number
  circunferenciaAntebracoEsquerdo: number
  circunferenciaPanturrilhaDireita: number
  circunferenciaPanturrilhaEsquerda: number
  circunferenciaCoxaDireita: number
  circunferenciaCoxaEsquerda: number
  razaoCinturaQuadril: number
  valorBf: number
  valorImc: number
  altura: number
  peso: number
  cliente: ClienteType
}
