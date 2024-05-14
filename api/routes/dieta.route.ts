import { DietaController } from '@api/controllers/dietaController'
import { Router } from 'express'

const routes = Router()

routes.post('/', DietaController.cadastrar)
routes.get('/cliente/:id', DietaController.buscarPorCliente)
routes.get('/:id', DietaController.buscarPorId)
routes.put('/', DietaController.atualizar)

export default routes
