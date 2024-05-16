import { prisma } from '@api/utils/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class NutricionistaService {
  static async listarNutricionistas() {
    try {
      const _nutricionistas = prisma.nutricionista.findMany({
        select: {
          id: true,
          usuario: {
            select: {
              nome: true,
              sobrenome: true,
              email: true,
              telefone: true
            }
          },
          uf: true,
          crm: true,
          crn: true,
          dataCriacao: true,
          dataAtualizacao: true
        }
      })
      return _nutricionistas
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) throw new Error('Erro ao buscar nutricionistas.')
      throw new Error('Erro desconhecido.')
    }
  }

  static async buscarClientesPorNutricionistaId(id: number) {
    try {
      const _clientes = prisma.nutricionistasDietas.findMany({
        where: {
          nutricionistaId: id
        },
        select: {
          dieta: {
            select: {
              objetivoFoco: true,
              novaDieta: true,
              dietaAtual: true,
              cliente: {
                select: {
                  id: true,
                  objetivo: true,
                  observacao: true,
                  usuario: {
                    select: {
                      nome: true,
                      sobrenome: true,
                      email: true,
                      telefone: true
                    }
                  }
                }
              }
            }
          }
        }
      })
      return _clientes
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError)
        throw new Error('Clientes não encontrados para este nutricionista.')
      throw new Error('Erro desconhecido.')
    }
  }
  static async buscarClientesPendentesPorNutricionistaId(id: number) {
    try {
      const _clientes = prisma.nutricionistasDietas.findMany({
        where: {
          nutricionistaId: id,
          dieta: {
            novaDieta: true,
          }
        },
        select: {
          dieta: {
            select: {
              objetivoFoco: true,
              cliente: {
                select: {
                  id: true,
                  objetivo: true,
                  observacao: true,
                  usuario: {
                    select: {
                      nome: true,
                      sobrenome: true,
                      email: true,
                      telefone: true
                    }
                  }
                }
              },
              dataCriacao: true,
            }
          }
        }
      })
      return _clientes
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError)
        throw new Error('Clientes não encontrados para este nutricionista.')
      throw new Error('Erro desconhecido.')
    }
  }
}
