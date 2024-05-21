import { BaseType } from './base.type'
import { ClienteType } from './cliente.type'
import { NutricionistaType } from './nutricionista.type'

type BaseUsuario = {
  nome: string
  sobrenome: string
  email: string
  senha: string
  dataNascimento: Date
  genero: string
  telefone: string
}

export type UsuarioClienteType = BaseType &
  BaseUsuario & {
    cliente: ClienteType
  }

export type UsuarioNutricionistaType = BaseType &
  BaseUsuario & {
    nutricionista: NutricionistaType
  }
