import supabase from './supabase'

function criarService(tabela) {
  return {
    async listar() {
      const { data, error } = await supabase
        .from(tabela)
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        throw error
      }

      return data || []
    },

    async criar(novoRegistro) {
      const { data, error } = await supabase
        .from(tabela)
        .insert([novoRegistro])
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    },

    async atualizar(id, dadosAtualizados) {
      const { data, error } = await supabase
        .from(tabela)
        .update(dadosAtualizados)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    },

    async excluir(id) {
      const { error } = await supabase
        .from(tabela)
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }
    }
  }
}

export const equipamentoService = criarService('equipamentos')
export const cidadeService = criarService('cidades')
export const funcionarioService = criarService('funcionarios')
export const servicoService = criarService('servicos')
