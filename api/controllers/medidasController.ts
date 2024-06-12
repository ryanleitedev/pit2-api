import { HttpException } from '@api/exceptions/httpexception'
import { MedidasService } from '@api/services/medida.service'
import { RequestHandler } from 'express'
import Joi from 'joi'

export class MedidasController {
  static cadastrar: RequestHandler = async (req, res, next) => {
     /*
      #swagger.tags = ['Medidas']
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/cadastrarMedidas"
            }
          }
        }
      }
    */
    try {
      const medidasSchema = Joi.object({
        clienteId: Joi.number().positive().required(),
        altura: Joi.number().positive().required(),
        peso: Joi.number().positive().required(),
        circunferenciaPescoco: Joi.number().required(),
        circunferenciaCintura: Joi.number().required(),
        circunferenciaQuadril: Joi.number(),
      }).required()

      const { error, value } = medidasSchema.validate(req.body)
      if (error) throw new Error(error.message)

      await MedidasService.cadastrar(value)
      return res.status(201).json({ message: 'Medidas cadastradas com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
  static atualizar: RequestHandler = async (req, res, next) => {
    /*
      #swagger.tags = ['Medidas']
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/atualizarMedidas"
            }
          }
        }
      }
    */
    try {
      const medidasSchema = Joi.object({
        id: Joi.number().positive().required(),
        clienteId: Joi.number().positive().required(),
        altura: Joi.number().positive().required(),
        peso: Joi.number().positive().required()
      }).required()

      const { error, value } = medidasSchema.validate(req.body)
      if (error) throw new Error(error.message)

      await MedidasService.atualizar(value)
      return res.status(200).json({ message: 'Medidas atualizadas com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }

  static buscarPorClienteId: RequestHandler = async (req, res, next) => {
    // #swagger.tags = ['Medidas']
    try {
      const medidasSchema = Joi.object({
        id: Joi.number().positive().required()
      })
      const { error, value } = medidasSchema.validate(req.params)
      if (error) throw new Error(error.message)

      const medidas = await MedidasService.buscarUltimaMedidaPorClienteId(value.id)
      return res.status(200).json(medidas)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
  static buscarProgressoPorClienteId: RequestHandler = async (req, res, next) => {
    // #swagger.tags = ['Medidas']
    try {
      const medidasSchema = Joi.object({
        id: Joi.number().positive().required()
      })
      const { error, value } = medidasSchema.validate(req.params)
      if (error) throw new Error(error.message)

      const medidas = await MedidasService.buscarProgressoPorClienteId(value.id)
      return res.status(200).json(medidas)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
}
