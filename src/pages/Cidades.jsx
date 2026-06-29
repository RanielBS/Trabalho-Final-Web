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
    <section className="pagina">
      <div className="cabecalho-pagina">
        <div>
          <span className="etiqueta">Cadastro</span>
          <h2>Gestão de Cidades</h2>
          <p>Controle as cidades vinculadas às operações da mineradora.</p>
        </div>
        <strong className="contador">{cidades.length} registros</strong>
      </div>

      <div className="painel formulario">
        <h3>{editandoId ? 'Editar cidade' : 'Nova cidade'}</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Nome da cidade"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
          {editandoId && <button className="botao-secundario" onClick={limparFormulario}>Cancelar</button>}
        </div>
      </div>

      <div className="painel">
        <div className="titulo-lista">
          <h3>Cidades cadastradas</h3>
          {carregando && <span>Carregando...</span>}
        </div>

        <div className="tabela-responsiva">
          <table>
            <thead>
              <tr>
                <th>Cidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cidades.map((cidade) => (
                <tr key={cidade.id}>
                  <td>{cidade.nome}</td>
                  <td className="acoes">
                    <button onClick={() => editar(cidade)}>Editar</button>
                    <button className="botao-perigo" onClick={() => excluir(cidade.id)}>Excluir</button>
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

export default Cidades
