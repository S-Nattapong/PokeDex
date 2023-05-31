import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import Team1 from "../../data/Team1.json";
import Team2 from "../../data/Team2.json";
import Navbar from "../../components/Navbar";

const VSSimPage = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [teamPokemons, setTeamPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);

  const fetchPokemon = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Failed to fetch Pokemon with ID ${id}:`, error);
    }
  };

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

    getTeamNames();
    getTeamPokemons();
  }, []);

const getPokemonImageUrl = (name) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name}.png`;
};

const handlePokemonClick = async (id) => {
  setSelectedPokemon(id);
  const selectedTeam = Team1.pokemonList.find((pokemon) => pokemon.id === id)
    ? Team1
    : Team2;
  const selectedPokemon = selectedTeam.pokemonList.find(
    (pokemon) => pokemon.id === id
  );
  if (selectedPokemon) {
    const pokemonData = await fetchPokemon(id);
    setSelectedPokemonData({
      id: pokemonData.id,
      name: pokemonData.name,
      image: getPokemonImageUrl(pokemonData.id),
    });
  }
};
 const handleButtonHover = (event) => {
    event.currentTarget.style.transform = "scale(1.35)";
 };
   const handleButtonLeave = (event) => {
     event.currentTarget.style.transform = "scale(1)";
     event.currentTarget.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";
   };

const defaultImageUrl = "/images/tPbdvZ3MLTQdI3CUlmsvf-bg-removed.png";
  return (
    <Box>
      <Navbar />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
            marginTop: "0.4rem",
          }}
        >
          <Box sx={{ marginTop: "-6rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1>VS Simulation</h1>
            </Box>
            {teamNames.length > 0 ? (
              <Grid container spacing={2}>
                <Grid sx={{ marginLeft: "7rem" }} item xs={5}>
                  <h2 style={{ marginLeft: "9rem" }}>Team 1:</h2>
                  <Grid container spacing={1}>
                    {Team1.pokemonList.map((pokemon) => (
                      <Grid item key={pokemon.id}>
                        <Button>
                          <img
                            src={defaultImageUrl}
                            alt={pokemon.name}
                            style={{
                              width: "40px",
                              height: "40px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonLeave}
                            onClick={() => handlePokemonClick(pokemon.id)}
                          />
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <h2 style={{ marginLeft: "9rem" }}>Team 2:</h2>
                  <Grid container spacing={1}>
                    {Team2.pokemonList.map((pokemon) => (
                      <Grid item key={pokemon.id}>
                        <Button>
                          <img
                            src={defaultImageUrl}
                            alt={pokemon.name}
                            style={{
                              width: "40px",
                              height: "40px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonLeave}
                            onClick={() => handlePokemonClick(pokemon.id)}
                          />
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid
                  sx={{ marginLeft: "26rem", marginTop: "5rem" }}
                  item
                  xs={4}
                >
                  <Button sx={{marginLeft:"2rem"}}>
                    <img
                      src="/images/Battle_icon-icons.com_67586.png"
                      alt="battle"
                      style={{
                        width: "150px",
                        height: "150px",
                        fontFamily: "Public Pixel",
                      }}
                      onMouseEnter={handleButtonHover}
                      onMouseLeave={handleButtonLeave}
                    />
                  </Button>
                  <h2>Selected Pokémon:</h2>
                  {selectedPokemonData ? (
                    <Box>
                      <img
                        src={getPokemonImageUrl(selectedPokemonData.id)}
                        alt={selectedPokemonData.name}
                        style={{
                          width: "200px",
                          height: "200px",
                          fontFamily: "Public Pixel",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          fontFamily: "Public Pixel",
                        }}
                      >
                        {selectedPokemonData.name}
                      </p>
                    </Box>
                  ) : (
                    <p>No Pokémon selected.</p>
                  )}
                </Grid>
              </Grid>
            ) : (
              <p>No team names found.</p>
            )}
          </Box>
        </Container>
      </Grid>
    </Box>
  );
};

export default VSSimPage;
