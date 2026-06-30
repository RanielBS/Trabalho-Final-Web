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
    </div>
  )
}

export default App
