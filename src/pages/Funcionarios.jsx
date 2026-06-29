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
    <section className="pagina">
      <div className="cabecalho-pagina">
        <div>
          <span className="etiqueta">Cadastro</span>
          <h2>Gestão de Funcionários</h2>
          <p>Gerencie colaboradores responsáveis pelas atividades da mineradora.</p>
        </div>
        <strong className="contador">{funcionarios.length} registros</strong>
      </div>

      <div className="painel formulario">
        <h3>{editandoId ? 'Editar funcionário' : 'Novo funcionário'}</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Nome do funcionário"
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
          {editandoId && <button className="botao-secundario" onClick={limparFormulario}>Cancelar</button>}
        </div>
      </div>

      <div className="painel">
        <div className="titulo-lista">
          <h3>Funcionários cadastrados</h3>
          {carregando && <span>Carregando...</span>}
        </div>

        <div className="tabela-responsiva">
          <table>
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cargo}</td>
                  <td className="acoes">
                    <button onClick={() => editar(funcionario)}>Editar</button>
                    <button className="botao-perigo" onClick={() => excluir(funcionario.id)}>Excluir</button>
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

export default Funcionarios
