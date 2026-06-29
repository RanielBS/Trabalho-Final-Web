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
    <div>
      <h2>Gestão de Equipamentos</h2>

      <div className="formulario">
        <h3>{editandoId ? 'Editar Equipamento' : 'Novo Equipamento'}</h3>
        <input
          type="text"
          placeholder="Nome do Equipamento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Setor (Ex: Extração)"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
        />

        <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
        {editandoId && <button onClick={limparFormulario}>Cancelar</button>}
      </div>

      <h3>Equipamentos Cadastrados</h3>
      <p>Total: {equipamentos.length}</p>
      {carregando && <p>Carregando dados...</p>}

      <ul>
        {equipamentos.map((equipamento) => (
          <li key={equipamento.id}>
            <strong>{equipamento.nome}</strong> - Setor: {equipamento.setor}{' '}
            <button onClick={() => editar(equipamento)}>Editar</button>{' '}
            <button onClick={() => excluir(equipamento.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Equipamentos
