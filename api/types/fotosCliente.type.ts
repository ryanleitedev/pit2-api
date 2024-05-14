import { BaseType } from './base.type'
import { ClienteType } from './cliente.type'

export type FotosClienteType = BaseType & {
  clienteId: number
  caminhoFoto: string
  cliente: ClienteType
}
