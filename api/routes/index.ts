import { errorHandler } from '@api/middlewares/error'
import { Router } from 'express'
import usuarioRouter from './usuario.route'
import alimentoRouter from './alimento.route'
import dietaRouter from './dieta.route'
import nutricionistaRouter from './nutricionista.route'
import medidasRouter from './medidas.route'

const routes = Router()

routes.get('/', async (req, res) => {
  return res.status(200).json({ message: 'Hello World' })
})
routes.use('/usuario', usuarioRouter)
routes.use('/nutricionista', nutricionistaRouter)
routes.use('/alimento', alimentoRouter)
routes.use('/dieta', dietaRouter)
routes.use('/medidas', medidasRouter)

routes.use(errorHandler)

export default routes
