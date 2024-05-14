import { MedidasType } from '@api/types/medidas.type'
import { prisma } from '@api/utils/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class MedidasService {
  static async cadastrar(medidas: MedidasType) {
    try {
      medidas.valorImc = medidas.peso / Math.pow(medidas.altura / 100, 2)
      await prisma.medidas.create({
        data: {
          clienteId: medidas.clienteId,
          valorImc: medidas.valorImc,
          altura: medidas.altura,
          peso: medidas.peso,
        }
      })
    } catch (_) {
      throw new Error('Erro ao cadastrar medidas.')
    }
  }
  static async atualizar(medidas: MedidasType) {
    try {
      medidas.valorImc = medidas.peso / Math.pow(medidas.altura / 100, 2)
      await prisma.medidas.update({
        where: {
          id: medidas.id
        },
        data: {
          clienteId: medidas.clienteId,
          valorImc: medidas.valorImc,
          altura: medidas.altura,
          peso: medidas.peso
        }
      })
    } catch (_) {
      throw new Error('Erro ao atualizar medidas.')
    }
  }
  static async buscarPorId(id: number) {
    try {
      const _medidas = await prisma.medidas.findFirstOrThrow({
        where: {
          id: id
        },
        select: {
          id: true,
          clienteId: true,
          valorImc: true,
          altura: true,
          peso: true,
          dataCriacao: true,
          dataAtualizacao: true,
          cliente: {
            select: {
              usuario: {
                select: {
                  nome: true,
                  sobrenome: true
                }
              }
            }
          }
        }
      })
      return _medidas
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw new Error('Medidas não encontradas.')
      throw new Error('Erro ao buscar medidas.')
    }
  }
  static async buscarUltimaMedidaPorClienteId(id: number) {
    try {
      const _medidas = await prisma.medidas.findFirstOrThrow({
        where: {
          clienteId: id
        },
        orderBy: [{ dataCriacao: 'desc' }],
        select: {
          id: true,
          clienteId: true,
          valorImc: true,
          altura: true,
          peso: true,
          dataCriacao: true,
          dataAtualizacao: true
        }
      })
      return _medidas
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw new Error('Medidas não encontradas.')
      throw new Error('Erro ao buscar medidas.')
    }
  }

  static async buscarProgressoPorClienteId(clienteId: number) {
    try {
      const _medidas = await prisma.medidas.findMany({
        where: {
          clienteId: clienteId
        },
        orderBy: [{ dataCriacao: 'asc' }],
        select: {
          id: true,
          clienteId: true,
          valorImc: true,
          altura: true,
          peso: true,
          dataCriacao: true,
          dataAtualizacao: true
        }
      })

      return _medidas
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new Error('Não foi possível obter o progresso de medidas.')
      throw new Error('Erro ao buscar progresso.')
    }
  }
}
