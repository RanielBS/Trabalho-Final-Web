import "./Equipamento.css"

function Equipamento(props){
    return (
        <div className="card">
            <h2> {props.nome} </h2>
            <p> Setor: {props.setor} </p>
        </div>
    )
}
export default Equipamento
