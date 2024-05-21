import { Decimal } from '@prisma/client/runtime/library'
import { AlimentosDietasType } from './alimentosDietas.type'
import { BaseType } from './base.type'
import { ClienteType } from './cliente.type'
import { NutricionistasDietasType } from './nutricionistasDietas.type'

export type DietaType = BaseType & {
  clienteId: number
  objetivoFoco: string
  dietaAtual: boolean
  novaDieta: boolean

  pesoAtual: Decimal
  alturaAtual: Decimal

  caloriasTotais?: number
  carboidratosTotais?: Decimal
  proteinasTotais?: Decimal
  gordurasTotais?: Decimal

  cliente: ClienteType
  nutricionista: NutricionistasDietasType
  alimentos: AlimentosDietasType[]
}
