import { Router } from 'express'

export function criarCrudRoutes(controller) {
  const router = Router()

  router.get('/', controller.listar)
  router.post('/', controller.criar)
  router.put('/:id', controller.atualizar)
  router.delete('/:id', controller.excluir)

  return router
}
