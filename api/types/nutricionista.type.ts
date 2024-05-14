import { BaseType } from './base.type'
import { DietaType } from './dieta.type'
import { UsuarioNutricionistaType } from './usuario.type'

export type NutricionistaType = BaseType & {
  usuarioId: number
  crn?: number
  crm?: number
  uf: string
  usuario: UsuarioNutricionistaType
  dietas?: DietaType[]
}
