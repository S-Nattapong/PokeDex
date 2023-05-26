import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Team1 from "../../data/Team1.json";
import Team2 from "../../data/Team2.json";
import Navbar from "../../components/Navbar";

const VSSimPage = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [teamPokemons, setTeamPokemons] = useState([]);

  useEffect(() => {
    const getTeamNames = () => {
      const names = [Team1.teamName, Team2.teamName];
      setTeamNames(names);
    };

const getTeamPokemons = async () => {
  const pokemonIds = [
    ...Team1.pokemonList.map((pokemon) => pokemon.id),
    ...Team2.pokemonList.map((pokemon) => pokemon.id),
  ];
  const pokemonData = await Promise.all(
    pokemonIds.map((id) => fetchPokemon(id))
  );
  const pokemonNames = pokemonData.map((data) => data.name);
  setTeamPokemons(pokemonNames);
};

    const fetchPokemon = async (id) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(`Failed to fetch Pokemon with ID ${id}:`, error);
      }
    };

    getTeamNames();
    getTeamPokemons();
  }, []);

  const getPokemonImageUrl = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  return (
    
    <Box>
      <Navbar/>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Box>
          <h1>VS Simulation</h1>
          {teamNames.length > 0 ? (
            <Box>
              <h2>Team 1:</h2>
              <ul>
                {Team1.pokemonList.map((pokemon) => (
                  <li key={pokemon.id}>
                    <img
                      src={getPokemonImageUrl(pokemon.id)}
                      alt={pokemon.name}
                      style={{ width: "150px", height: "150px" }}
                    />
                    {pokemon.name}
                  </li>
                ))}
              </ul>
              <h2>Team 2:</h2>
              <ul>
                {Team2.pokemonList.map((pokemon) => (
                  <li key={pokemon.id}>
                    <img
                      src={getPokemonImageUrl(pokemon.id)}
                      alt={pokemon.name}
                      style={{ width: "150px", height: "150px" }}
                    />
                    {pokemon.name}
                  </li>
                ))}
              </ul>
            </Box>
          ) : (
            <p>No team names found.</p>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default VSSimPage;
