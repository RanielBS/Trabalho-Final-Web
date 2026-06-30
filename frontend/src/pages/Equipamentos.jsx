import { useState, useEffect } from 'react'
import { equipamentoService } from '../services/api'

function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([])
  const [nome, setNome] = useState('')
  const [setor, setSetor] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    carregarEquipamentos()
  }, [])

  async function carregarEquipamentos() {
    try {
      setCarregando(true)
      const dados = await equipamentoService.listar()
      setEquipamentos(dados)
    } catch (error) {
      alert('Erro ao buscar equipamentos no Supabase.')
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }

  async function salvar() {
    if (!nome || !setor) {
      alert('Preencha todos os campos!')
      return
    }

    try {
      if (editandoId) {
        await equipamentoService.atualizar(editandoId, { nome, setor })
      } else {
        await equipamentoService.criar({ nome, setor })
      }

      limparFormulario()
      carregarEquipamentos()
    } catch (error) {
      alert('Erro ao salvar equipamento.')
      console.error(error)
    }
  }

  function editar(equipamento) {
    setEditandoId(equipamento.id)
    setNome(equipamento.nome)
    setSetor(equipamento.setor)
  }

  async function excluir(id) {
    const confirmou = confirm('Deseja excluir este equipamento?')
    if (!confirmou) return

    try {
      await equipamentoService.excluir(id)
      carregarEquipamentos()
    } catch (error) {
      alert('Erro ao excluir equipamento.')
      console.error(error)
    }
  }

  function limparFormulario() {
    setEditandoId(null)
    setNome('')
    setSetor('')
  }

  return (
    <section className="pagina">
      <div className="cabecalho-pagina">
        <div>
          <span className="etiqueta">Cadastro</span>
          <h2>Gestão de Equipamentos</h2>
          <p>Cadastre e acompanhe equipamentos utilizados nos setores da mineradora.</p>
        </div>
        <strong className="contador">{equipamentos.length} registros</strong>
      </div>

      <div className="painel formulario">
        <h3>{editandoId ? 'Editar equipamento' : 'Novo equipamento'}</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Nome do equipamento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="text"
            placeholder="Setor. Ex: Extração"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
          />

          <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
          {editandoId && <button className="botao-secundario" onClick={limparFormulario}>Cancelar</button>}
        </div>
      </div>

      <div className="painel">
        <div className="titulo-lista">
          <h3>Equipamentos cadastrados</h3>
          {carregando && <span>Carregando...</span>}
        </div>

        <div className="tabela-responsiva">
          <table>
            <thead>
              <tr>
                <th>Equipamento</th>
                <th>Setor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((equipamento) => (
                <tr key={equipamento.id}>
                  <td>{equipamento.nome}</td>
                  <td>{equipamento.setor}</td>
                  <td className="acoes">
                    <button onClick={() => editar(equipamento)}>Editar</button>
                    <button className="botao-perigo" onClick={() => excluir(equipamento.id)}>Excluir</button>
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

export default Equipamentos
