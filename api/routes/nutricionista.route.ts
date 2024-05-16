import { NutricionistaController } from '@api/controllers/nutricionistaController'
import { Router } from 'express'

const routes = Router()

routes.get('/', NutricionistaController.listarNutricionistas)
routes.get('/clientes/:id', NutricionistaController.buscarClientesPorNutricionistaId)
routes.get('/clientes/pendentes/:id', NutricionistaController.buscarClientesPendentesPorNutricionistaId)

export default routes
