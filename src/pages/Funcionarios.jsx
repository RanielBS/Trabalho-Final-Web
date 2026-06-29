import { useState, useEffect } from 'react'
import { funcionarioService } from '../services/api'

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  async function carregarFuncionarios() {
    try {
      setCarregando(true)
      const dados = await funcionarioService.listar()
      setFuncionarios(dados)
    } catch (error) {
      alert('Erro ao buscar funcionários no Supabase.')
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }

  async function salvar() {
    if (!nome || !cargo) {
      alert('Preencha todos os campos!')
      return
    }

    try {
      if (editandoId) {
        await funcionarioService.atualizar(editandoId, { nome, cargo })
      } else {
        await funcionarioService.criar({ nome, cargo })
      }

      limparFormulario()
      carregarFuncionarios()
    } catch (error) {
      alert('Erro ao salvar funcionário.')
      console.error(error)
    }
  }

  function editar(funcionario) {
    setEditandoId(funcionario.id)
    setNome(funcionario.nome)
    setCargo(funcionario.cargo)
  }

  async function excluir(id) {
    const confirmou = confirm('Deseja excluir este funcionário?')
    if (!confirmou) return

    try {
      await funcionarioService.excluir(id)
      carregarFuncionarios()
    } catch (error) {
      alert('Erro ao excluir funcionário.')
      console.error(error)
    }
  }

  function limparFormulario() {
    setEditandoId(null)
    setNome('')
    setCargo('')
  }

  return (
    <div>
      <h2>Gestão de Funcionários</h2>

      <div className="formulario">
        <h3>{editandoId ? 'Editar Funcionário' : 'Novo Funcionário'}</h3>
        <input
          type="text"
          placeholder="Nome do Funcionário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />

        <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
        {editandoId && <button onClick={limparFormulario}>Cancelar</button>}
      </div>

      <h3>Funcionários Cadastrados</h3>
      <p>Total: {funcionarios.length}</p>
      {carregando && <p>Carregando dados...</p>}

      <ul>
        {funcionarios.map((funcionario) => (
          <li key={funcionario.id}>
            <strong>{funcionario.nome}</strong> - Cargo: {funcionario.cargo}{' '}
            <button onClick={() => editar(funcionario)}>Editar</button>{' '}
            <button onClick={() => excluir(funcionario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Funcionarios
