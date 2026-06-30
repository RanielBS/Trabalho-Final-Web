import { useState, useEffect } from 'react'
import { servicoService } from '../services/api'

function Servicos() {
  const [servicos, setServicos] = useState([])
  const [descricao, setDescricao] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    carregarServicos()
  }, [])

  async function carregarServicos() {
    try {
      setCarregando(true)
      const dados = await servicoService.listar()
      setServicos(dados)
    } catch (error) {
      alert('Erro ao buscar serviços no Supabase.')
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }

  async function salvar() {
    if (!descricao || !responsavel) {
      alert('Preencha todos os campos!')
      return
    }

    try {
      if (editandoId) {
        await servicoService.atualizar(editandoId, { descricao, responsavel })
      } else {
        await servicoService.criar({ descricao, responsavel })
      }

      limparFormulario()
      carregarServicos()
    } catch (error) {
      alert('Erro ao salvar serviço.')
      console.error(error)
    }
  }

  function editar(servico) {
    setEditandoId(servico.id)
    setDescricao(servico.descricao)
    setResponsavel(servico.responsavel)
  }

  async function excluir(id) {
    const confirmou = confirm('Deseja excluir este serviço?')
    if (!confirmou) return

    try {
      await servicoService.excluir(id)
      carregarServicos()
    } catch (error) {
      alert('Erro ao excluir serviço.')
      console.error(error)
    }
  }

  function limparFormulario() {
    setEditandoId(null)
    setDescricao('')
    setResponsavel('')
  }

  return (
    <section className="pagina">
      <div className="cabecalho-pagina">
        <div>
          <span className="etiqueta">Cadastro</span>
          <h2>Gestão de Serviços</h2>
          <p>Acompanhe os serviços executados e seus responsáveis.</p>
        </div>
        <strong className="contador">{servicos.length} registros</strong>
      </div>

      <div className="painel formulario">
        <h3>{editandoId ? 'Editar serviço' : 'Novo serviço'}</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Descrição do serviço"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            type="text"
            placeholder="Responsável"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
          />

          <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
          {editandoId && <button className="botao-secundario" onClick={limparFormulario}>Cancelar</button>}
        </div>
      </div>

      <div className="painel">
        <div className="titulo-lista">
          <h3>Serviços cadastrados</h3>
          {carregando && <span>Carregando...</span>}
        </div>

        <div className="tabela-responsiva">
          <table>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico) => (
                <tr key={servico.id}>
                  <td>{servico.descricao}</td>
                  <td>{servico.responsavel}</td>
                  <td className="acoes">
                    <button onClick={() => editar(servico)}>Editar</button>
                    <button className="botao-perigo" onClick={() => excluir(servico.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Servicos
