import { BaseType } from './base.type'
import { MedidasType } from './medidas.type'
import { DietaType } from './dieta.type'
import { FotosClienteType } from './fotosCliente.type'
import { UsuarioClienteType } from './usuario.type'

export type ClienteType = BaseType & {
  usuarioId: number
  observacao: string
  objetivo: string

  usuario: UsuarioClienteType
  medidas?: MedidasType[]
  dieta?: DietaType[]
  fotos?: FotosClienteType[]
}
