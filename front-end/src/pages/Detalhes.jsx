import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect,} from "react";
import "../styles/Detalhes.css";


function Detalhes(){
    const [pokemon,setPokemon]=useState(null)
    const [nivel,setNivel]=useState('')
    const[nivelModal,setNivelModal] = useState(false)
    const[nomeEvolucao,setNomeEvolucao]=useState('')
    const[tipoEvolucao,setTipoEvolucao]=useState('')
    const[nivelEvolucao,setNivelEvolucao]=useState('')
    const[imagemEvolucao,setImagemEvolucao]=useState('')
    const [modalEvolucao,setModalEvolucao]=useState(false)
    const[modalDeletar,setModalDeletar]=useState(false)
    const [mensagem,setMensagem]=useState('')
    const[carrgando,setCarregando]=useState(true)

    const {id} = useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(mensagem){
            const timer =setTimeout(()=>{
                setMensagem('')

            },4000)

        }
    },[mensagem])



    function buscar_detalhes() {
        fetch(`http://127.0.0.1:5000/detalhes/${id}`)
            .then( async response =>{
                const data= await response.json()
                if(!response.ok){
                    throw new Error(data.message)
                }
                return data
            })
            .then(data=>{
                setPokemon(data)
                setCarregando(false)
            })
            .catch(error => {
                console.log(error)
                setMensagem(error.message)
                setCarregando(false)
            })
    }

    function atualizar_nivel(event){
        event.preventDefault()
        if(!verificar_nivel()){return}
        fetch(`http://127.0.0.1:5000/atualizar_nivel/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({nivel_pokemon:Number(nivel)})
        })
            .then(async response=>{
                const data= await response.json()
                if(!response.ok){
                    throw new Error(data.message )
                }
                return data
            })
            .then(data=>{
                setNivelModal(false)
                setMensagem(data.message)
                buscar_detalhes()
            })
            .catch(error=>{
                console.log(error)
                setMensagem(error.message)
            })

    }
    function evolucao (event){
        event.preventDefault()
        if(!verificar_evolucao()){return}
        const pokemon={
            nome_pokemon:nomeEvolucao,
            tipo_pokemon:tipoEvolucao,
            nivel_pokemon:Number(nivelEvolucao),
            imagem_pokemon:imagemEvolucao
        }

        fetch(`http://127.0.0.1:5000/evoluir/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(pokemon)
        })
            .then( async response=>{
                const data= await response.json()
                if(!response.ok){
                    throw new Error(data.message)
                }
                return data
            })
            .then(data=>{
                setModalEvolucao(false)
                buscar_detalhes()
                setMensagem(data.message)
                setNomeEvolucao("")
                setTipoEvolucao("")
                setNivelEvolucao("")
                setImagemEvolucao("")
            })
            .catch(error=>{
                console.log(error)
                setMensagem(error.message)
            })
    }

    function deletar(event){
        event.preventDefault()
        fetch(`http://127.0.0.1:5000/deletar/${id}`,{
            method:'DELETE'
        })
            .then(async response=>{
                const data = await response.json()
                if(!response.ok){
                    throw new Error(data.message)
                }
                return data
            })
            .then(data=>{

                setModalDeletar(false)
                navigate("/",{
                    state:{
                        mensagem:data.message
                    }
                })
            })
            .catch(error=>{
                console.log(error)
                setMensagem(error.message)

            })
    }

    function verificar_evolucao(){
        if(!nomeEvolucao || !tipoEvolucao || !nivelEvolucao || !imagemEvolucao){
            setMensagem("Erro os campos nao podem ser vazios")
            return false
        }
        if(Number(nivelEvolucao)<=0){
            setMensagem("Erro o nivel nao pode ser menor que 0")
            return false
        }

        if(nomeEvolucao.trim()==="" || tipoEvolucao.trim()==="" || imagemEvolucao.trim()===""){
            setMensagem("Erro os campos nao podem conter espacos")
            return false
        }

        if(!imagemEvolucao.startsWith("http://") && !imagemEvolucao.startsWith("https://")){
            setMensagem("Url de imagem nao permitida")
            return false

        }
        return true
    }

    function verificar_nivel(){
        if(Number(nivel)<=0){
            setMensagem("Nivel não pode ser menor que  0")
            return false
        }
        return true
    }
    function voltar(){
        navigate("/")
    }

    useEffect(()=>{
        buscar_detalhes()
    },[])

    if(carrgando){
        return <p>Carregando....</p>
    }
    if(!pokemon){
        return <p>{mensagem}</p>
    }

    return(
        <>
            <main className="detalhes-page">
                <section className="detalhes-container">
                <header className="detalhes-header">
                    <h1>Detalhes do Pokemon</h1>
                    <button className="btn-home" onClick={voltar}>Home</button>
                </header>
                <div className="pokemon-detalhes-card">
                    <div className="detalhes-image-container">
                        <img  className="detalhes-image" src={pokemon.imagem_pokemon} alt={pokemon.nome_pokemon}/>
                    </div>
                    <div className="detalhes-info">
                <h2>Nome: {pokemon.nome_pokemon}</h2>
                        <h3><strong>Tipo: {pokemon.tipo_pokemon}</strong></h3>
                        <p><strong>Nivel: {pokemon.nivel_pokemon}</strong></p>
                    </div>
                    </div>
                {mensagem && <p className="detalhes-mensagem">{mensagem}</p>}
                    <div className="detalhes-acoes">
                <button className="btn-atualizar" onClick={()=>setNivelModal(true)}>Atualizar Nivel</button>
                <button className="btn-evoluir" onClick={()=>{setModalEvolucao(true)}}>Fazer Evolução</button>
                <button className="btn-deletar" onClick={()=>{setModalDeletar(true)}}>Deletar Pokemon</button>
                    </div>
                {nivelModal &&(
                    <div className="modal-overlay">
                    <form  className="modal-form"  onSubmit={atualizar_nivel}>
                    <input type={"number"} placeholder={"Digite o novo nivel"} onChange={event => {setNivel(event.target.value)}} />
                        <div className="modal-acoes">
                        <button type={"button"} onClick={()=>setNivelModal(false)}>Cancelar edição</button>
                    <button type={"submit"}>Atualizar</button>
                            </div>
                </form>
                        </div>
                )}
                {modalEvolucao &&(
                    <div className="modal-overlay">
                    <form  className="modal-form" onSubmit={evolucao}>
                        <input type={"text"} placeholder={"Digite no nome da evolução "} value={nomeEvolucao} onChange={event => {setNomeEvolucao(event.target.value)}}/>
                        <input type={"text"} placeholder={"Digite no tipo da evolução "} value={tipoEvolucao} onChange={event => {setTipoEvolucao(event.target.value)}}/>
                        <input type={"number"} placeholder={"Digite o nível  da evolução "} value={nivelEvolucao} onChange={event => {setNivelEvolucao(event.target.value)}}/>
                        <input type={"text"} placeholder={"Coloque a URL da imagem da evolução "} value={imagemEvolucao} onChange={event => {setImagemEvolucao(event.target.value)}}/>
                        <div className="modal-acoes">
                        <button type={"button"} onClick={()=>{setModalEvolucao(false)}}>Cancelar Evolução</button>
                        <button type={"submit"}>Evoluir</button>
                            </div>
                    </form>
                        </div>
                )}
                {modalDeletar &&(
                    <div className="modal-overlay">
                    <form className="modal-form" onSubmit={deletar}>
                        <div className="modal-acoes">
                        <button type={"button"} onClick={()=>{setModalDeletar(false)}}>Cancelar</button>
                        <button type={"submit"} className="btn-confirmar-delete">Confirmar exclusão</button>
                            </div>
                    </form>
                        </div>
                )}


                    </section>
                </main>



        </>
    )

}


export default Detalhes