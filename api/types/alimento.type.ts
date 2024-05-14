import { BaseType } from './base.type'

export type AlimentoType = BaseType & {
  nome: string
  calorias: number
  carboidratos: number
  proteinas: number
  gorduras: number
}
