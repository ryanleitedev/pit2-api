import { DietaType } from '@api/types/dieta.type'
import { prisma } from '@api/utils/prisma'
import { Decimal, PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { AlimentoService } from './alimento.service'

export class DietaService {
  static async buscarPorId(id: number) {
    try {
      const _dieta = await prisma.dieta.findFirstOrThrow({
        where: {
          id: id
        },
        select: {
          id: true,
          caloriasTotais: true,
          carboidratosTotais: true,
          proteinasTotais: true,
          gordurasTotais: true,
          novaDieta: true,
          dietaAtual: true,
          objetivoFoco: true,
          dataCriacao: true,
          dataAtualizacao: true,
          alimentosDietas: {
            select: {
              horario: true,
              pesoGramas: true,
              dataCriacao: true,
              dataAtualizacao: true,
              alimento: {
                select: {
                  nome: true
                }
              }
            },
            orderBy: [{ horario: 'asc' }]
          },
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

      return _dieta
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) throw new Error('Dieta não encontrada.')
      throw new Error('Erro desconhecido.')
    }
  }
  static async buscarPorCliente(clienteId: number) {
    try {
      const _dieta = await prisma.dieta.findMany({
        where: {
          clienteId: clienteId
        },
        orderBy: [{ novaDieta: 'desc' }, { dietaAtual: 'desc' }, { dataCriacao: 'desc' }],
        select: {
          id: true,
          caloriasTotais: true,
          carboidratosTotais: true,
          proteinasTotais: true,
          gordurasTotais: true,
          novaDieta: true,
          dietaAtual: true,
          objetivoFoco: true,
          dataCriacao: true,
          dataAtualizacao: true
        }
      })
      return _dieta
    } catch (e) {
      throw new Error('Erro desconhecido.')
    }
  }
  static async cadastrar(dieta: DietaType) {
    try {
      const alimentosIds: number[] = dieta.alimentos.map(alimento => alimento.alimentoId)
      const _alimentos = await AlimentoService.buscarPorIds(alimentosIds)

      dieta.caloriasTotais = 0
      dieta.carboidratosTotais = new Decimal(0)
      dieta.gordurasTotais = new Decimal(0)
      dieta.proteinasTotais = new Decimal(0)

      alimentosIds.map(alimentoId => {
        const alimento = _alimentos.find(a => a.id === alimentoId)
        if (alimento === undefined) return
        dieta.caloriasTotais += alimento.calorias
        dieta.carboidratosTotais = dieta.carboidratosTotais.add(alimento.carboidratos)
        dieta.gordurasTotais = dieta.gordurasTotais.add(alimento.gorduras)
        dieta.proteinasTotais = dieta.proteinasTotais.add(alimento.proteinas)
      })

      if (dieta.dietaAtual) {
        await prisma.dieta.updateMany({
          where: {
            dietaAtual: true,
            clienteId: dieta.clienteId
          },
          data: {
            dietaAtual: false
          }
        })
      }

      await prisma.$transaction(async function (tx) {
        const _dieta = await tx.dieta.create({
          data: {
            clienteId: dieta.clienteId,
            dietaAtual: dieta.dietaAtual,
            novaDieta: false,
            caloriasTotais: dieta.caloriasTotais,
            carboidratosTotais: dieta.carboidratosTotais,
            proteinasTotais: dieta.proteinasTotais,
            gordurasTotais: dieta.gordurasTotais,
            objetivoFoco: dieta.objetivoFoco
          }
        })

        dieta.alimentos = dieta.alimentos
          .map(dietaAlimento => {
            const idAlimento = _alimentos.find(alimento => alimento.id === dietaAlimento.alimentoId)?.id
            if (!idAlimento) return
            dietaAlimento.alimentoId = idAlimento
            dietaAlimento.dietaId = _dieta.id
            return dietaAlimento
          })
          .filter(a => a)

        await tx.alimentosDietas.createMany({
          data: dieta.alimentos
        })

        await tx.nutricionistasDietas.create({
          data: {
            dietaId: _dieta.id,
            nutricionistaId: dieta.nutricionista.nutricionistaId
          }
        })
      })
    } catch (_) {
      throw new Error('Erro ao cadastrar dieta.')
    }
  }

  static async atualizar(dieta: DietaType) {
    try {
      const alimentosIds: number[] = dieta.alimentos.map(alimento => alimento.alimentoId)
      const _alimentos = await AlimentoService.buscarPorIds(alimentosIds)

      dieta.caloriasTotais = 0
      dieta.carboidratosTotais = new Decimal(0)
      dieta.gordurasTotais = new Decimal(0)
      dieta.proteinasTotais = new Decimal(0)

      alimentosIds.map(alimentoId => {
        const alimento = _alimentos.find(a => a.id === alimentoId)
        if (alimento === undefined) return
        dieta.caloriasTotais += alimento.calorias
        dieta.carboidratosTotais = dieta.carboidratosTotais.add(alimento.carboidratos)
        dieta.gordurasTotais = dieta.gordurasTotais.add(alimento.gorduras)
        dieta.proteinasTotais = dieta.proteinasTotais.add(alimento.proteinas)
      })

      if (dieta.dietaAtual) {
        await prisma.dieta.updateMany({
          where: {
            dietaAtual: true,
            clienteId: dieta.clienteId
          },
          data: {
            dietaAtual: false
          }
        })
      }

      dieta.alimentos = dieta.alimentos
        .map(dietaAlimento => {
          const idAlimento = _alimentos.find(alimento => alimento.id === dietaAlimento.alimentoId)?.id
          if (!idAlimento) return
          dietaAlimento.alimentoId = idAlimento
          dietaAlimento.dietaId = dieta.id
          return dietaAlimento
        })
        .filter(a => a)

      const _dieta = prisma.dieta.update({
        where: {
          id: dieta.id
        },
        data: {
          dietaAtual: dieta.dietaAtual,
          novaDieta: false,
          caloriasTotais: dieta.caloriasTotais,
          carboidratosTotais: dieta.carboidratosTotais,
          proteinasTotais: dieta.proteinasTotais,
          gordurasTotais: dieta.gordurasTotais,
          objetivoFoco: dieta.objetivoFoco
        }
      })

      const _alimentosDietasDelete = prisma.alimentosDietas.deleteMany({
        where: {
          dietaId: dieta.id
        }
      })

      const _alimentosDietasCreate = prisma.alimentosDietas.createMany({
        data: dieta.alimentos
      })

      await prisma.$transaction([_dieta, _alimentosDietasDelete, _alimentosDietasCreate])
    } catch (_) {
      throw new Error('Erro ao atualizar dieta.')
    }
  }

  static async solicitarDieta(dieta: DietaType) {
    try {
      const _dieta = await prisma.dieta.create({
        data: {
          clienteId: dieta.clienteId,
          novaDieta: true,
          objetivoFoco: dieta.objetivoFoco
        }
      })

      await prisma.nutricionistasDietas.create({
        data: {
          dietaId: _dieta.id,
          nutricionistaId: dieta.nutricionista.nutricionistaId
        }
      })
    } catch (_) {
      throw new Error('Erro ao cadastrar solicitação de dieta.')
    }
  }
}
