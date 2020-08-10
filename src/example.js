/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import axios from "axios";


export default function QueryParamsExample() {
  return (
    <Router>
      <QueryParamsDemo />
    </Router>
  );
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParamsDemo() {
  let query = useQuery();

  return (
    <div>
      <div>
        {/* <h2>Accounts</h2> */}
        <ul>
          <li>
            <Link to="/id?name={''}">Show Pokemon</Link>
          </li>
        </ul>

        <Pokemon name={query.get("name")} />
      </div>
    </div>
  );
}

function Pokemon({ name, image }) {
    const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setPokemon] = useState({});

  useEffect(() => {
    findPokemon();
  }, []);

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(21);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const findPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokeId())
      .then((response) => {
        setPokemon(response.data);
      });
  };

  const Pokedex = () => {
    return (
      <section className="pokedex">
        <h2>Pokédex</h2>
        <div className="pokedex-list">
          {pokedex.map((pokemon) => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  pokemon.id +
                  ".png"
                }
                className="sprite"
                alt="pokemon"
              />
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <button
                className="remove"
                onClick={() => removePokemon(pokemon.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const removePokemon = (id) => {
    setPokedex((state) => state.filter((p) => p.id !== id));
  };

  return (
    <div>
      {name ? (
        <h3>
          The Pokemon <code>name</code> you clicked is &quot;
          {wildPokemon.name}
          <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  wildPokemon.id +
                  ".png"
                }
                className="sprite"
                alt="pokemon"
              />
              {wildPokemon.height}
          &quot;
        </h3>
      ) : (
        <h3>Still no Pokemon</h3>
      )}
    </div>
  );
}
