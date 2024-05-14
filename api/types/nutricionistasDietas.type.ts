import { DietaType } from './dieta.type'
import { NutricionistaType } from './nutricionista.type'

export type NutricionistasDietasType = {
  nutricionistaId: number
  dietaId: number

  dataCriacao: Date
  dataAtualizacao: Date

  nutricionista: NutricionistaType
  dieta: DietaType
}
