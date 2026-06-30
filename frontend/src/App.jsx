import { useState } from 'react'
import Menu from './components/Menu'
import Inicio from './pages/Inicio'
import Equipamentos from './pages/Equipamentos'
import Cidades from './pages/Cidades'
import Funcionarios from './pages/Funcionarios'
import Servicos from './pages/Servicos'
import './App.css'

function App() {
  const [pagina, setPagina] = useState('inicio')

  return (
    <div className="app">
      <Menu pagina={pagina} setPagina={setPagina} />

      <main className="conteudo">
        {pagina === 'inicio' && <Inicio setPagina={setPagina} />}
        {pagina === 'equipamentos' && <Equipamentos />}
        {pagina === 'cidades' && <Cidades />}
        {pagina === 'funcionarios' && <Funcionarios />}
        {pagina === 'servicos' && <Servicos />}
      </main>

<footer className="rodape">
  <strong> Sistema de Gerenciamento de Serviços de Mineração</strong>
  <p>Controle de equipamentos, cidades, funcionários e serviços.</p>
  <span>© 2026 • Universidade Federal do Ceará</span>
</footer>
    </div>
  )
}

export default App