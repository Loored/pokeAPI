/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Navigator from "./Navigator";
// import Example from "./example";

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    findPokemon();
  }, []);

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

              {/* <p>Height: {pokemon.height}</p> */}
              <button
                onClick={() => alert(pokemon.weight)}
                className="pokemon-name"
              >
                <p>Name: {pokemon.name}</p>
                <p>Height: {pokemon.height}</p>
                <p>Wieght: {pokemon.weight}</p>
              </button>
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

  const CatchPokemon = () => {
    return (
      <section className="catch-pokemon">
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            pokemon.id +
            ".png"
          }
          className="sprite"
          alt="pokemon"
        />
        <h3>{pokemon.name}</h3>
        <button className="catch-btn" onClick={() => catchPokemon(pokemon)}>
          CATCH POKEMON
        </button>
      </section>
    );
  };

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(21);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const findPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokeId())
      .then((response) => {
        setPokemon(response.data);
        console.log(response.data);
        console.log(response.data.name);
      });
  };

  const catchPokemon = (pokemon) => {
    setPokedex((state) => {
      const pokemonExists = state.filter((p) => pokemon.id === p.id).length > 0;

      if (!pokemonExists) {
        state = [...state, pokemon];
        state.sort(function (a, b) {
          return a.id - b.id;
        });
      }
      return state;
    });
    findPokemon();
  };

  const removePokemon = (id) => {
    setPokedex((state) => state.filter((p) => p.id !== id));
  };

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Pokemon API</h1>
      </header>
      <CatchPokemon />
      <Pokedex />
    </div>
  );
}

export default App;
