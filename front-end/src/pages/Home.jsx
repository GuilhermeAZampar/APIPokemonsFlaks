import {useEffect, useState} from "react";
import PokemonCard from "../components/PokemonCard.jsx";
import {Link, useLocation} from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [pokemon,setPokemon]=useState([])
    const location=useLocation()
  function buscar_pokemon(){
    fetch("http://127.0.0.1:5000/pokemons",{
    })
        .then(response=>response.json())
        .then(data=>{
          console.log(data)
          setPokemon(data.pokemons)
        })
  }

  useEffect(()=>{
    buscar_pokemon()

  },[])

  return (
    <>
        <main className="pokedex-page">
            <header className="pokedex-header">
        <h1  className="pokedex-title">PokeDex</h1>
        <Link className="btn-cadastrar" to={"/cadastrar"}>Cadastrar Pokemon</Link>
            </header>
        {location.state?.mensagem &&(
            <p className="mensagem-sucesso">{location.state.mensagem}</p>
        )}
            <section className="pokemon-grid">
      {pokemon.map((poke)=>(

        <PokemonCard key ={poke.id_pokemon} pokemon={poke}/>
      ))}
          </section>
        </main>

    </>
  )
}

export default Home