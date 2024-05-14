import { UsuarioClienteController, UsuarioNutricionistaController } from '@api/controllers/usuarioController'
import { Router } from 'express'

const routes = Router()

routes.post('/cliente/login', UsuarioClienteController.login)
routes.post('/cliente/cadastrar', UsuarioClienteController.cadastrar)
routes.post('/cliente/solicitardieta', UsuarioClienteController.solicitarDieta)
routes.put('/cliente/atualizarperfil', UsuarioClienteController.atualizarPerfil)

routes.post('/nutricionista/login', UsuarioNutricionistaController.login)
routes.post('/nutricionista/cadastrar', UsuarioNutricionistaController.cadastrar)

export default routes
