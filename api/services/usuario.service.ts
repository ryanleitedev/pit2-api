import { prisma } from '@api/utils/prisma'
import { sha256 } from '@api/utils/crypto'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { UsuarioClienteType, UsuarioNutricionistaType } from '@api/types/usuario.type'

export class UsuarioClienteService {
  static async cadastrar(usuario: UsuarioClienteType) {
    try {
      const _usuario = await prisma.usuario.create({
        data: {
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          email: usuario.email,
          senha: sha256(usuario.senha),
          dataNascimento: usuario.dataNascimento,
          genero: usuario.genero,
          telefone: usuario.telefone,
          cliente: {
            create: {
              objetivo: usuario.cliente?.objetivo || '',
              observacao: usuario.cliente?.observacao || '',
              tipoPerfil: usuario.cliente?.tipoPerfil || '',
            }
          }
        }
      })
      return _usuario.id
    } catch (error) {
      if (error.code === 'P2002') throw new Error('Já existe um cliente cadastrado com esse email.')
      throw new Error('Erro ao criar cliente.')
    }
  }
  static async login(usuario: UsuarioClienteType) {
    try {
      const _usuario = await prisma.usuario.findFirstOrThrow({
        where: {
          AND: {
            email: usuario.email,
            senha: sha256(usuario.senha)
          }
        },
        select: {
          id: true,
          nome: true,
          sobrenome: true,
          email: true,
          telefone: true,
          dataCriacao: true,
          dataAtualizacao: true,
          dataNascimento: true,
          genero: true,
          cliente: {
            select: {
              id: true,
              objetivo: true,
              observacao: true,
              tipoPerfil: true,
            }
          }
        }
      })
      if (_usuario.cliente === null) throw new Error('Cliente não encontrado.')
      return _usuario
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) throw new Error('Cliente não encontrado.')
      if (e instanceof Error) throw new Error(e.message)
      throw new Error('Erro desconhecido.')
    }
  }

  static async atualizarPerfil(usuario: UsuarioClienteType) {
    try {
      await prisma.usuario.update({
        where: {
          id: usuario.id
        },
        data: {
          cliente: {
            update: {
              objetivo: usuario.cliente.objetivo,
              observacao: usuario.cliente.observacao,
              tipoPerfil: usuario.cliente.tipoPerfil
            }
          }
        }
      })
    } catch (_) {
      throw new Error('Erro ao atualizar o perfil.')
    }
  }

  static async buscarGenero(clienteId: number) {
    try{
      const _usuario = await prisma.usuario.findFirstOrThrow({
        where: {
          cliente: {
            id: clienteId
          }
        },
        select: {
          genero: true,
        }
      })
      return _usuario
    } catch (e) {
      console.log(e)
      if (e instanceof Error) throw new Error(e.message)
      throw new Error('Erro desconhecido.')
    }
  }
}

export class UsuarioNutricionistaService {
  static async cadastrar(usuario: UsuarioNutricionistaType) {
    try {
      const _usuario = await prisma.usuario.create({
        data: {
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          email: usuario.email,
          senha: sha256(usuario.senha),
          dataNascimento: usuario.dataNascimento,
          genero: usuario.genero,
          telefone: usuario.telefone,
          nutricionista: {
            create: {
              crm: usuario.nutricionista.crm,
              crn: usuario.nutricionista.crn,
              uf: usuario.nutricionista.uf.toUpperCase()
            }
          }
        }
      })
      return _usuario.id
    } catch (error) {
      if (error.code === 'P2002') throw new Error('Já existe um nutricionista cadastrado com esse email.')
      throw new Error('Erro ao criar nutricionista.')
    }
  }
  static async login(usuario: UsuarioNutricionistaType) {
    try {
      const _usuario = await prisma.usuario.findFirstOrThrow({
        where: {
          AND: {
            email: usuario.email,
            senha: sha256(usuario.senha)
          }
        },
        select: {
          nome: true,
          sobrenome: true,
          email: true,
          telefone: true,
          dataCriacao: true,
          dataAtualizacao: true,
          dataNascimento: true,
          genero: true,
          nutricionista: {
            select: {
              id: true,
              crm: true,
              crn: true,
              uf: true
            }
          }
        }
      })
      if (_usuario.nutricionista === null) throw new Error('Nutricionista não encontrado.')

      return _usuario
    } catch (e) {
      console.log(e)
      if (e instanceof PrismaClientKnownRequestError) throw new Error('Nutricionista não encontrado.')
      if (e instanceof Error) throw new Error(e.message)
      throw new Error('Erro desconhecido.')
    }
  }
}
