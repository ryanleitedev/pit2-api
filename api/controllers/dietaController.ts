import { HttpException } from '@api/exceptions/httpexception'
import { DietaService } from '@api/services/dieta.service'
import { RequestHandler } from 'express'
import Joi from 'joi'

export class DietaController {
  static cadastrar: RequestHandler = async (req, res, next) => {
    try {
      const dietaSchema = Joi.object({
        clienteId: Joi.number().positive().required(),
        objetivoFoco: Joi.string().required(),
        dietaAtual: Joi.bool().required(),
        alimentos: Joi.array()
          .items(
            Joi.object({
              alimentoId: Joi.number().positive().required(),
              horario: Joi.date().required(),
              pesoGramas: Joi.number().positive().required()
            }).required()
          )
          .required(),
        nutricionista: Joi.object({
          nutricionistaId: Joi.number().positive().required()
        }).required()
      }).required()

      const { error, value } = dietaSchema.validate(req.body)
      if (error) throw new Error(error.message)

      await DietaService.cadastrar(value)
      return res.status(201).json({ message: 'Dieta cadastrada com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
  static atualizar: RequestHandler = async (req, res, next) => {
    try {
      const dietaSchema = Joi.object({
        id: Joi.number().positive().required(),
        objetivoFoco: Joi.string().required(),
        dietaAtual: Joi.bool().required(),
        alimentos: Joi.array()
          .items(
            Joi.object({
              alimentoId: Joi.number().positive().required(),
              horario: Joi.date().required(),
              pesoGramas: Joi.number().positive().required()
            }).required()
          )
          .required()
      }).required()

      const { error, value } = dietaSchema.validate(req.body)
      if (error) throw new Error(error.message)

      await DietaService.atualizar(value)
      return res.status(201).json({ message: 'Dieta atualizada com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }

  static buscarPorId: RequestHandler = async (req, res, next) => {
    try {
      const dietaSchema = Joi.object({
        id: Joi.number().positive().required()
      }).required()

      const { error, value } = dietaSchema.validate(req.params)
      if (error != null) throw new Error(error.message)

      const dieta = await DietaService.buscarPorId(value.id)
      return res.status(200).json(dieta)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }

  static buscarPorCliente: RequestHandler = async (req, res, next) => {
    try {
      const dietaSchema = Joi.object({
        id: Joi.number().positive().required()
      }).required()

      const { error, value } = dietaSchema.validate(req.params)
      if (error != null) throw new Error(error.message)

      const dieta = await DietaService.buscarPorCliente(value.id)
      return res.status(200).json(dieta)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
}
