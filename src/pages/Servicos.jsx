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
    <div>
      <h2>Gestão de Serviços</h2>

      <div className="formulario">
        <h3>{editandoId ? 'Editar Serviço' : 'Novo Serviço'}</h3>
        <input
          type="text"
          placeholder="Descrição do Serviço"
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
        {editandoId && <button onClick={limparFormulario}>Cancelar</button>}
      </div>

      <h3>Serviços Cadastrados</h3>
      <p>Total: {servicos.length}</p>
      {carregando && <p>Carregando dados...</p>}

      <ul>
        {servicos.map((servico) => (
          <li key={servico.id}>
            <strong>{servico.descricao}</strong> - Responsável: {servico.responsavel}{' '}
            <button onClick={() => editar(servico)}>Editar</button>{' '}
            <button onClick={() => excluir(servico.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Servicos
