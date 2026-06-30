import { useEffect, useState } from 'react'
import {
  cidadeService,
  equipamentoService,
  funcionarioService,
  servicoService
} from '../services/api'

function Inicio({ setPagina }) {
  const [resumo, setResumo] = useState({
    equipamentos: 0,
    cidades: 0,
    funcionarios: 0,
    servicos: 0
  })

  useEffect(() => {
    async function carregarResumo() {
      try {
        const [equipamentos, cidades, funcionarios, servicos] = await Promise.all([
          equipamentoService.listar(),
          cidadeService.listar(),
          funcionarioService.listar(),
          servicoService.listar()
        ])

        setResumo({
          equipamentos: equipamentos.length,
          cidades: cidades.length,
          funcionarios: funcionarios.length,
          servicos: servicos.length
        })
      } catch (error) {
        console.error('Erro ao carregar resumo do painel.', error)
      }
    }

    carregarResumo()
  }, [])

  return (
    <div className="pagina-inicio">
      <section className="hero">
        <div className="hero-texto">
          <h1>Sistema Integrado da Mineradora</h1>
          <div className="hero-acoes">
            <button onClick={() => setPagina('equipamentos')}>Gerenciar equipamentos</button>
            <button className="botao-secundario" onClick={() => setPagina('servicos')}>
              Ver serviços
            </button>
          </div>
        </div>

      </section>

      <section className="cards-resumo">
        <div className="card-resumo">
          <span></span>
          <p>Equipamentos</p>
          <strong>{resumo.equipamentos}</strong>
        </div>
        <div className="card-resumo">
          <span></span>
          <p>Cidades</p>
          <strong>{resumo.cidades}</strong>
        </div>
        <div className="card-resumo">
          <span></span>
          <p>Funcionários</p>
          <strong>{resumo.funcionarios}</strong>
        </div>
        <div className="card-resumo">
          <span></span>
          <p>Serviços</p>
          <strong>{resumo.servicos}</strong>
        </div>
      </section>

      <section className="modulos">
        <div className="modulo" onClick={() => setPagina('equipamentos')}>
          <h3>Equipamentos</h3>
          <p>Controle os equipamentos da mineradora e seus setores.</p>
        </div>
        <div className="modulo" onClick={() => setPagina('cidades')}>
          <h3>Cidades</h3>
          <p>Organize as localidades relacionadas às operações.</p>
        </div>
        <div className="modulo" onClick={() => setPagina('funcionarios')}>
          <h3>Funcionários</h3>
          <p>Gerencie colaboradores e cargos cadastrados.</p>
        </div>
        <div className="modulo" onClick={() => setPagina('servicos')}>
          <h3>Serviços</h3>
          <p>Acompanhe os serviços e seus responsáveis.</p>
        </div>
      </section>
    </div>
  )
}

export default Inicio
