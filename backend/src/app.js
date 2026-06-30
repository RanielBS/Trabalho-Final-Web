import express from 'express'
import cors from 'cors'

import equipamentosRoutes from './routes/equipamentosRoutes.js'
import cidadesRoutes from './routes/cidadesRoutes.js'
import funcionariosRoutes from './routes/funcionariosRoutes.js'
import servicosRoutes from './routes/servicosRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Sistema Mineradora funcionando.' })
})

app.get('/api/status', (req, res) => {
  res.json({ status: 'online' })
})

app.use('/api/equipamentos', equipamentosRoutes)
app.use('/api/cidades', cidadesRoutes)
app.use('/api/funcionarios', funcionariosRoutes)
app.use('/api/servicos', servicosRoutes)

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' })
})

export default app
