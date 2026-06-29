import { useState, useEffect } from 'react'
import { cidadeService } from '../services/api'

function Cidades() {
  const [cidades, setCidades] = useState([])
  const [nome, setNome] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    carregarCidades()
  }, [])

  async function carregarCidades() {
    try {
      setCarregando(true)
      const dados = await cidadeService.listar()
      setCidades(dados)
    } catch (error) {
      alert('Erro ao buscar cidades no Supabase.')
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }

  async function salvar() {
    if (!nome) {
      alert('Preencha o nome da cidade!')
      return
    }

    try {
      if (editandoId) {
        await cidadeService.atualizar(editandoId, { nome })
      } else {
        await cidadeService.criar({ nome })
      }

      limparFormulario()
      carregarCidades()
    } catch (error) {
      alert('Erro ao salvar cidade.')
      console.error(error)
    }
  }

  function editar(cidade) {
    setEditandoId(cidade.id)
    setNome(cidade.nome)
  }

  async function excluir(id) {
    const confirmou = confirm('Deseja excluir esta cidade?')
    if (!confirmou) return

    try {
      await cidadeService.excluir(id)
      carregarCidades()
    } catch (error) {
      alert('Erro ao excluir cidade.')
      console.error(error)
    }
  }

  function limparFormulario() {
    setEditandoId(null)
    setNome('')
  }

  return (
    <div>
      <h2>Gestão de Cidades</h2>

      <div className="formulario">
        <h3>{editandoId ? 'Editar Cidade' : 'Nova Cidade'}</h3>
        <input
          type="text"
          placeholder="Nome da Cidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
        {editandoId && <button onClick={limparFormulario}>Cancelar</button>}
      </div>

      <h3>Cidades Cadastradas</h3>
      <p>Total: {cidades.length}</p>
      {carregando && <p>Carregando dados...</p>}

      <ul>
        {cidades.map((cidade) => (
          <li key={cidade.id}>
            {cidade.nome}{' '}
            <button onClick={() => editar(cidade)}>Editar</button>{' '}
            <button onClick={() => excluir(cidade.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cidades
