import { AlimentoType } from './alimento.type'
import { DietaType } from './dieta.type'

export type AlimentosDietasType = {
  alimentoId: number
  dietaId: number

  horario: Date
  pesoGramas: number

  dataCriacao: Date
  dataAtualizacao: Date

  alimento: AlimentoType
  dieta: DietaType
}
