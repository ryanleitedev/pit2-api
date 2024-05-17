import { HttpException } from '@api/exceptions/httpexception'
import { DietaService } from '@api/services/dieta.service'
import { UsuarioClienteService, UsuarioNutricionistaService } from '@api/services/usuario.service'
import { RequestHandler } from 'express'
import Joi from 'joi'

export class UsuarioClienteController {
  static login: RequestHandler = async (req, res, next) => {
    /*
    #swagger.tags = ['Cliente']
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/usuarioClienteLogin"
            }
          }
        }
      }
    */
    try {
      const usuarioSchema = Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().required()
      }).required()
      const { error, value } = usuarioSchema.validate(req.body)
      if (error != null) throw new Error(error.message)
      const usuario = await UsuarioClienteService.login(value)
      return res.status(200).json(usuario)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }

  static cadastrar: RequestHandler = async (req, res, next) => {
    /*
    #swagger.tags = ['Cliente']
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/usuarioClienteCadastrar"
            }
          }
        }
      }
    */
    try {
      const usuarioSchema = Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().required(),
        nome: Joi.string().required(),
        sobrenome: Joi.string().required(),
        telefone: Joi.string().required(),
        cliente: Joi.object({
          objetivo: Joi.string().max(45),
          observacao: Joi.string().max(450)
        })
      }).required()
      const { error, value } = usuarioSchema.validate(req.body)
      if (error != null) throw new Error(error.message)
      await UsuarioClienteService.cadastrar(value)
      return res.status(201).json({ message: 'Cliente cadastrado com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }

  static solicitarDieta: RequestHandler = async (req, res, next) => {
    /*
    #swagger.tags = ['Cliente']
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/usuarioClienteSolicitarDieta"
            }
          }
        }
      }
    */
    try {
      const dietaSchema = Joi.object({
        clienteId: Joi.number().positive().required(),
        objetivoFoco: Joi.string(),
        nutricionista: Joi.object({
          nutricionistaId: Joi.number().positive().required()
        }).required()
      }).required()

      const { error, value } = dietaSchema.validate(req.body)
      if (error != null) throw new Error(error.message)
      await DietaService.solicitarDieta(value)
      return res.status(201).json({ message: 'Dieta solicitada com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }

  static atualizarPerfil: RequestHandler = async (req, res, next) => {
    /*
    #swagger.tags = ['Cliente']
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/usuarioClienteAtualizarPerfil"
            }
          }
        }
      }
    */
    try {
      const usuarioSchema = Joi.object({
        cliente: Joi.object({
          objetivo: Joi.string().max(45),
          observacao: Joi.string().max(450)
        })
      }).required()
      const { error, value } = usuarioSchema.validate(req.body)
      if (error != null) throw new Error(error.message)

      await UsuarioClienteService.atualizarPerfil(value)
      return res.status(201).json({ message: 'Cliente atualizado com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
}

export class UsuarioNutricionistaController {
  static login: RequestHandler = async (req, res, next) => {
    /*
    #swagger.tags = ['Nutricionista']
      #swagger.requestBody = {
        description: "Faz o login de um nutricionista."
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/usuarioNutricionistaLogin"
            }
          }
        }
      }
    */
    try {
      const usuarioSchema = Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().required()
      }).required()
      const { error, value } = usuarioSchema.validate(req.body)
      if (error != null) throw new Error(error.message)
      const usuario = await UsuarioNutricionistaService.login(value)
      return res.status(200).json(usuario)
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }

  static cadastrar: RequestHandler = async (req, res, next) => {
    /*
    #swagger.tags = ['Nutricionista']
      #swagger.requestBody = {
        description: "Faz o cadastro de um nutricionista."
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/usuarioNutricionistaCadastrar"
            }
          }
        }
      }
    */
    try {
      const usuarioSchema = Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().required(),
        nome: Joi.string().required(),
        sobrenome: Joi.string().required(),
        telefone: Joi.string().required(),
        nutricionista: Joi.object({
          uf: Joi.string().length(2).required(),
          crm: Joi.alternatives().conditional('crn', {
            not: Joi.exist(),
            then: Joi.number().positive().required(),
            otherwise: Joi.optional()
          }),
          crn: Joi.alternatives().conditional('crm', {
            not: Joi.exist(),
            then: Joi.number().positive().required(),
            otherwise: Joi.optional()
          })
        }).required()
      }).required()
      const { error, value } = usuarioSchema.validate(req.body)
      if (error != null) throw new Error(error.message)
      await UsuarioNutricionistaService.cadastrar(value)
      return res.status(201).json({ message: 'Nutricionista cadastrado com sucesso.' })
    } catch ({ message }) {
      next(new HttpException({ message }))
    }
  }
}
