import { HttpException } from '@api/exceptions/httpexception'
import { NutricionistaService } from '@api/services/nutricionista.service'
import { RequestHandler } from 'express'
import Joi from 'joi'

export class NutricionistaController {
  static buscarClientesPorNutricionistaId: RequestHandler = async (req, res, next) => {
    try {
      const nutricionistaSchema = Joi.object({
        id: Joi.number().positive().allow(0).required()
      })

      const { error, value } = nutricionistaSchema.validate(req.params)
      if (error != null) throw new Error(error.message)

      const clientes = await NutricionistaService.buscarClientesPorNutricionistaId(value.id)
      return res.status(200).json(clientes)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }

  static listarNutricionistas: RequestHandler = async (req, res, next) => {
    try {
      const nutricionistas = await NutricionistaService.listarNutricionistas()
      return res.status(200).json(nutricionistas)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
}
