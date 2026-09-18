import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Cadastrar.css";

function Cadastrar() {
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('')
    const [nivel, setNivel] = useState('')
    const [imagem, setImagem] = useState('')
    const [mensagem, setMensagem] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        if(mensagem){
            const timer = setTimeout(()=>{
                setMensagem('')
            },4000)
            return ()=>clearTimeout(timer)
        }

    },[mensagem])

    function adicionar(event) {
        event.preventDefault()

        if (!vericacao()) {
            return
        }

        const pokemon = {
            nome_pokemon: nome,
            tipo_pokemon: tipo,
            nivel_pokemon: Number(nivel),
            imagem_pokemon: imagem
        }

        fetch("http://127.0.0.1:5000/adicionar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemon)
        })
            .then(async response => {
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message)
                }

                return data
            })
            .then(data => {
                console.log(data)

                navigate("/", {
                    state: {
                        mensagem: data.message
                    }
                })
            })
            .catch(error => {
                console.log(error.message)
                setMensagem(error.message)
            })
    }

    function voltar() {
        navigate("/")
    }

    function vericacao() {
        if (!nome || !tipo || !nivel || !imagem) {
            setMensagem("Erro: os campos não podem ser vazios")
            return false
        }

        if (Number(nivel) <= 0) {
            setMensagem("Erro: o Pokémon não pode ter nível 0 ou negativo")
            return false
        }

        if (nome.trim() === "" || tipo.trim() === "" || imagem.trim() === "") {
            setMensagem("Os campos não podem conter apenas espaços")
            return false
        }

        if (!imagem.startsWith("http://") && !imagem.startsWith("https://")) {
            setMensagem("URL da imagem não permitida")
            return false
        }

        return true
    }

    return (
        <main className="cadastro-page">
            <section className="cadastro-container">
                <header className="cadastro-header">
                    <h1>Cadastrar Pokémon</h1>
                    <button className="btn-voltar" type="button" onClick={voltar}>Home</button>
                </header>

                <div className="cadastro-card">

                    <h2>Novo Pokémon</h2>

                    <p className="cadastro-descricao">
                        Preencha os dados para adicionar um novo Pokémon à Pokédex.
                    </p>

                    {mensagem && (
                        <p className="cadastro-mensagem">
                            {mensagem}
                        </p>
                    )}

                    <form className="cadastro-form" onSubmit={adicionar}>
                        <label>
                            Nome
                            <input type="text" placeholder="Nome do Pokémon" value={nome} onChange={event => setNome(event.target.value)}/></label>
                        <label>
                            Tipo
                            <input type="text" placeholder="Tipo do Pokémon" value={tipo} onChange={event => setTipo(event.target.value)}/>
                        </label>
                        <label>
                            Nível
                            <input type="number" placeholder="Nível do Pokémon" value={nivel} onChange={event => setNivel(event.target.value)}/>
                        </label>

                        <label>Imagem
                            <input type="text" placeholder="URL da imagem do Pokémon" value={imagem} onChange={event => setImagem(event.target.value)}/>
                        </label>

                        <div className="cadastro-acoes">
                            <button className="btn-cancelar" type="button" onClick={voltar}>Cancelar</button>
                            <button className="btn-salvar" type="submit">Cadastrar Pokémon</button>
                        </div>
                    </form>

                </div>

            </section>
        </main>
    )
}

export default Cadastrar