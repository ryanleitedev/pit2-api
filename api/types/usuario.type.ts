import { BaseType } from './base.type'
import { ClienteType } from './cliente.type'
import { NutricionistaType } from './nutricionista.type'

export type UsuarioClienteType = BaseType & {
  nome: string
  sobrenome: string
  email: string
  senha: string
  telefone: string
  cliente: ClienteType
}

export type UsuarioNutricionistaType = BaseType & {
  nome: string
  sobrenome: string
  email: string
  senha: string
  telefone: string
  nutricionista: NutricionistaType
}
