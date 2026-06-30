function Menu({ pagina, setPagina }) {
  const itens = [
    { chave: 'inicio', texto: 'Início' },
    { chave: 'equipamentos', texto: 'Equipamentos' },
    { chave: 'cidades', texto: 'Cidades' },
    { chave: 'funcionarios', texto: 'Funcionários' },
    { chave: 'servicos', texto: 'Serviços' }
  ]

  return (
    <header className="topbar">
      <button className="marca" onClick={() => setPagina('inicio')}>
      
        <span>
          <strong>Sistema Mineradora</strong>
          <small>Painel administrativo</small>
        </span>
      </button>

      <nav className="menu">
        {itens.map((item) => (
          <button
            key={item.chave}
            className={pagina === item.chave ? 'ativo' : ''}
            onClick={() => setPagina(item.chave)}
          >
            {item.texto}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Menu
