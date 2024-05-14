import { HttpException } from '@api/exceptions/httpexception'
import { AlimentoService } from '@api/services/alimento.service'
import { RequestHandler } from 'express'
import Joi from 'joi'

export class AlimentoController {
  static cadastrar: RequestHandler = async (req, res, next) => {
    try {
      const alimentoSchema = Joi.object({
        nome: Joi.string().required(),
        calorias: Joi.number().positive().allow(0).required(),
        carboidratos: Joi.number().positive().allow(0).required(),
        proteinas: Joi.number().positive().allow(0).required(),
        gorduras: Joi.number().positive().allow(0).required()
      }).required()

      const { error, value } = alimentoSchema.validate(req.body)
      if (error != null) throw new Error(error.message)

      await AlimentoService.cadastrar(value)
      return res.status(201).json({ message: 'Alimento cadastrado com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
  static cadastrarLista: RequestHandler = async (req, res, next) => {
    try {
      const alimentoSchema = Joi.array().items(
        Joi.object({
          nome: Joi.string().required(),
          calorias: Joi.number().positive().allow(0).required(),
          carboidratos: Joi.number().positive().allow(0).required(),
          proteinas: Joi.number().positive().allow(0).required(),
          gorduras: Joi.number().positive().allow(0).required()
        }).required()
      )

      const { error, value } = alimentoSchema.validate(req.body)
      if (error != null) throw new Error(error.message)

      await AlimentoService.cadastrarLista(value)
      return res.status(201).json({ message: 'Alimentos cadastrados com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
  static listarTodos: RequestHandler = async (req, res, next) => {
    try {
      const alimentos = await AlimentoService.listarTodos()
      return res.status(200).json(alimentos)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
  static buscarPorId: RequestHandler = async (req, res, next) => {
    try {
      const alimentoSchema = Joi.object({
        id: Joi.number().positive().required()
      }).required()

      const { error, value } = alimentoSchema.validate(req.params)
      if (error != null) throw new Error(error.message)

      const alimento = await AlimentoService.buscarPorId(value.id)
      return res.status(200).json(alimento)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
  static buscarPorDietaId: RequestHandler = async (req, res, next) => {
    try {
      const alimentoSchema = Joi.object({
        id: Joi.number().positive().required()
      }).required()

      const { error, value } = alimentoSchema.validate(req.params)
      if (error != null) throw new Error(error.message)

      const alimentos = await AlimentoService.buscarPorDietaId(value.id)
      return res.status(200).json(alimentos)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
}
