import { AlimentoType } from '@api/types/alimento.type'
import { prisma } from '@api/utils/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class AlimentoService {
  static async cadastrar(alimento: AlimentoType) {
    try {
      await prisma.alimento.create({
        data: {
          nome: alimento.nome,
          calorias: alimento.calorias,
          carboidratos: alimento.carboidratos,
          proteinas: alimento.proteinas,
          gorduras: alimento.gorduras
        }
      })
    } catch (_) {
      throw new Error('Erro ao cadastrar alimento.')
    }
  }
  static async cadastrarLista(alimentos: AlimentoType[]) {
    try {
      await prisma.alimento.createMany({
        data: alimentos,
        skipDuplicates: true
      })
    } catch (_) {
      throw new Error('Erro ao cadastrar alimento.')
    }
  }
  static async listarTodos() {
    try {
      const _alimentos = await prisma.alimento.findMany({
        select: {
          id: true,
          nome: true,
          calorias: true,
          carboidratos: true,
          proteinas: true,
          gorduras: true
        },
        orderBy: {
          nome: 'asc'
        }
      })

      return _alimentos
    } catch (_) {
      throw new Error('Erro ao listar alimentos.')
    }
  }

  static async buscarPorId(alimentoId: number) {
    try {
      const _alimentos = await prisma.alimento.findFirstOrThrow({
        where: {
          id: alimentoId
        },
        select: {
          id: true,
          nome: true,
          calorias: true,
          carboidratos: true,
          proteinas: true,
          gorduras: true
        }
      })
      return _alimentos
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) throw new Error('Alimento não encontrado.')
      throw new Error('Erro ao buscar alimento.')
    }
  }

  static async buscarPorIds(alimentosIds: number[]) {
    try {
      const _alimentos = await prisma.alimento.findMany({
        where: {
          id: {
            in: alimentosIds
          }
        },
        select: {
          id: true,
          nome: true,
          calorias: true,
          carboidratos: true,
          proteinas: true,
          gorduras: true
        }
      })
      return _alimentos
    } catch (_) {
      throw new Error('Erro ao buscar alimento.')
    }
  }

  static async buscarPorDietaId(dietaId: number) {
    try {
      const _alimentos = await prisma.alimentosDietas.findMany({
        select: {
          pesoGramas: true,
          horario: true,
          alimento: {
            select: {
              id: true,
              nome: true,
              calorias: true,
              carboidratos: true,
              proteinas: true,
              gorduras: true
            }
          }
        },
        where: {
          dietaId: dietaId
        }
      })
      return _alimentos
    } catch (_) {
      throw new Error('Erro ao buscar alimentos.')
    }
  }
}
