import { AlimentoController } from '@api/controllers/alimentoController'
import { Router } from 'express'

const routes = Router()

routes.post('/', AlimentoController.cadastrar)
routes.post('/lista', AlimentoController.cadastrarLista)
routes.get('/', AlimentoController.listarTodos)
routes.get('/:id', AlimentoController.buscarPorId)
routes.get('/dieta/:id', AlimentoController.buscarPorDietaId)

export default routes
