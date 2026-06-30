const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(opcoes.headers || {})
    },
    ...opcoes
  })

  const texto = await resposta.text()
  const dados = texto ? JSON.parse(texto) : null

  if (!resposta.ok) {
    throw new Error(dados?.erro || 'Erro na comunicação com o servidor.')
  }

  return dados
}

function criarService(recurso) {
  return {
    async listar() {
      return requisicao(`/${recurso}`)
    },

    async criar(novoRegistro) {
      return requisicao(`/${recurso}`, {
        method: 'POST',
        body: JSON.stringify(novoRegistro)
      })
    },

    async atualizar(id, dadosAtualizados) {
      return requisicao(`/${recurso}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dadosAtualizados)
      })
    },

    async excluir(id) {
      return requisicao(`/${recurso}/${id}`, {
        method: 'DELETE'
      })
    }
  }
}

export const equipamentoService = criarService('equipamentos')
export const cidadeService = criarService('cidades')
export const funcionarioService = criarService('funcionarios')
export const servicoService = criarService('servicos')
