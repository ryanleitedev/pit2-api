import { MedidasController } from '@api/controllers/medidasController'
import { Router } from 'express'

const routes = Router()

routes.post('/', MedidasController.cadastrar)
routes.put('/', MedidasController.atualizar)
routes.get('/cliente/:id', MedidasController.buscarPorClienteId)
routes.get('/progresso/cliente/:id', MedidasController.buscarProgressoPorClienteId)

export default routes
