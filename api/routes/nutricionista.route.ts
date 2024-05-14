import { NutricionistaController } from '@api/controllers/nutricionistaController'
import { Router } from 'express'

const routes = Router()

routes.get('/', NutricionistaController.listarNutricionistas)
routes.get('/clientes/:id', NutricionistaController.buscarClientesPorNutricionistaId)

export default routes
