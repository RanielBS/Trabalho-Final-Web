import supabase from '../config/supabase.js'

function filtrarCamposPermitidos(dados, camposPermitidos) {
  const resultado = {}

  camposPermitidos.forEach((campo) => {
    if (dados[campo] !== undefined) {
      resultado[campo] = dados[campo]
    }
  })

  return resultado
}

function validarCamposObrigatorios(dados, camposObrigatorios) {
  const camposVazios = camposObrigatorios.filter((campo) => {
    return dados[campo] === undefined || dados[campo] === null || String(dados[campo]).trim() === ''
  })

  return camposVazios
}

export function criarCrudController(tabela, camposPermitidos, camposObrigatorios = camposPermitidos) {
  return {
    async listar(req, res) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .select('*')
          .order('id', { ascending: true })

        if (error) throw error

        return res.json(data || [])
      } catch (error) {
        return res.status(500).json({ erro: `Erro ao listar ${tabela}.`, detalhes: error.message })
      }
    },

    async criar(req, res) {
      try {
        const dados = filtrarCamposPermitidos(req.body, camposPermitidos)
        const camposVazios = validarCamposObrigatorios(dados, camposObrigatorios)

        if (camposVazios.length > 0) {
          return res.status(400).json({ erro: `Campos obrigatórios: ${camposVazios.join(', ')}` })
        }

        const { data, error } = await supabase
          .from(tabela)
          .insert([dados])
          .select()
          .single()

        if (error) throw error

        return res.status(201).json(data)
      } catch (error) {
        return res.status(500).json({ erro: `Erro ao cadastrar em ${tabela}.`, detalhes: error.message })
      }
    },

    async atualizar(req, res) {
      try {
        const { id } = req.params
        const dados = filtrarCamposPermitidos(req.body, camposPermitidos)

        if (Object.keys(dados).length === 0) {
          return res.status(400).json({ erro: 'Nenhum campo válido foi enviado para atualização.' })
        }

        const { data, error } = await supabase
          .from(tabela)
          .update(dados)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error

        return res.json(data)
      } catch (error) {
        return res.status(500).json({ erro: `Erro ao atualizar ${tabela}.`, detalhes: error.message })
      }
    },

    async excluir(req, res) {
      try {
        const { id } = req.params

        const { error } = await supabase
          .from(tabela)
          .delete()
          .eq('id', id)

        if (error) throw error

        return res.status(204).send()
      } catch (error) {
        return res.status(500).json({ erro: `Erro ao excluir de ${tabela}.`, detalhes: error.message })
      }
    }
  }
}
