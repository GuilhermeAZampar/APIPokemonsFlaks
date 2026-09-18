import {useState,useEffect} from "react";
import {Link} from "react-router-dom";


function PokemonCard({pokemon}){

    return(
        <Link className="pokemon-card-link" to={`/pokemon/${pokemon.id_pokemon}`}>
            <article className="pokemon-card">
                <div className="pokemon-image-container">
                    <img className="pokemon-image" src={pokemon.imagem_pokemon} alt={pokemon.nome_pokemon}/>
                </div>
        <div className="pokemon-info">
        <h2 className="pokemon-name">{pokemon.nome_pokemon}</h2>
        <p className="pokemon-type">{pokemon.tipo_pokemon}</p>
        <p className="pokemon-level">{pokemon.nivel_pokemon}</p>
        </div>
                </article>
        </Link>
    )

}



export default PokemonCard