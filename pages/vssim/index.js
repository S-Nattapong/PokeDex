import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import Team1 from "../../data/Team1.json";
import Team2 from "../../data/Team2.json";
import Navbar from "../../components/Navbar";

const steps = ["Team Detail", "Round 1", "Round 2"];

const VSSimPage = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [teamPokemons, setTeamPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winnerStep2, setWinnerStep2] = useState(null);
  const [winnerStep3, setWinnerStep3] = useState(null);
  const [winnerStep4, setWinnerStep4] = useState(null);
  const [winnerStep5, setWinnerStep5] = useState(null);
  const [winnerStep6, setWinnerStep6] = useState(null);
  const [isBattleClicked, setIsBattleClicked] = useState(false);

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

    const storePokemonIndices = () => {
      const pokemonIndices = [
        ...Team1.pokemonList.map((_, index) => `Team 1 - Pokemon ${index + 1}`),
        ...Team2.pokemonList.map((_, index) => `Team 2 - Pokemon ${index + 1}`),
      ];
      console.log(pokemonIndices);
    };

    getTeamNames();
    getTeamPokemons();
    storePokemonIndices();
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

  const handleBattleButtonClick = () => {
    const team1Pokemon = Team1.pokemonList[0];
    const team2Pokemon = Team2.pokemonList[0];

    const team1Power = Math.floor(Math.random() * 100);
    const team2Power = Math.floor(Math.random() * 100);

    if (team1Power > team2Power) {
      setWinner(team1Pokemon.name);
    } else if (team2Power > team1Power) {
      setWinner(team2Pokemon.name);
    } else {
      setWinner("Draw");
    }
    
    setCurrentStep(1);
  };
  
  const handleBattle2ButtonClick = () => {
    const team1Pokemon = Team1.pokemonList[1];
    const team2Pokemon = Team2.pokemonList[1];

    const team1Power = Math.floor(Math.random() * 100);
    const team2Power = Math.floor(Math.random() * 100);

    if (team1Power > team2Power) {
      setWinnerStep2(team1Pokemon.name);
    } else if (team2Power > team1Power) {
      setWinnerStep2(team2Pokemon.name);
    } else {
      setWinnerStep2("Draw");
    }

    setCurrentStep(2);
  };

const handleNextButtonClick = () => {
  if (currentStep < 7) {
    setCurrentStep(currentStep + 1);
  }
};

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
                {currentStep === 0 && (
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
                )}

                {currentStep === 0 && (
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
                )}

                {currentStep === 0 && (
                  <Grid
                    sx={{ marginLeft: "26rem", marginTop: "5rem" }}
                    item
                    xs={4}
                  >
                    {currentStep === 0 && (
                      <Button
                        sx={{ marginLeft: "2rem" }}
                        onClick={handleBattleButtonClick}
                      >
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
                    )}
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
                )}

                {currentStep === 1 && (
                  <div>
                    <h1>Step 1</h1>
                    <div>
                      <h2>Team 1 - Pokemon 1:</h2>
                      {Team1.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team1.pokemonList[0].id)}
                          alt={Team1.pokemonList[0].name}
                        />
                      )}
                    </div>
                    <div>
                      <h2>Team 2 - Pokemon 1:</h2>
                      {Team2.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team2.pokemonList[0].id)}
                          alt={Team2.pokemonList[0].name}
                        />
                      )}
                    </div>
                    <Button onClick={handleBattleButtonClick}>Battle</Button>
                    {winner && (
                      <div>
                        <h2>Winner:</h2>
                        <p>{winner}</p>
                      </div>
                    )}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <div>
                      <h2>Team 1 - Pokemon 1:</h2>
                      {Team1.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team1.pokemonList[1].id)}
                          alt={Team1.pokemonList[1].name}
                        />
                      )}
                    </div>
                    <div>
                      <h2>Team 2 - Pokemon 1:</h2>
                      {Team2.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team2.pokemonList[1].id)}
                          alt={Team2.pokemonList[1].name}
                        />
                      )}
                    </div>
                    <Button onClick={handleBattle2ButtonClick}>Battle</Button>
                    {winnerStep2 && (
                      <div>
                        <h2>Winner:</h2>
                        <p>{winnerStep2}</p>
                      </div>
                    )}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <h1>Step 3</h1>
                    {/* Add content for step 2 here */}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </div>
                )}
                {currentStep === 4 && (
                  <div>
                    <h1>Step 4</h1>
                    {/* Add content for step 2 here */}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </div>
                )}
                {currentStep === 5 && (
                  <div>
                    <h1>Step 5</h1>
                    {/* Add content for step 2 here */}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </div>
                )}
                {currentStep === 6 && (
                  <div>
                    <h1>Step 6</h1>
                    {/* Add content for step 2 here */}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </div>
                )}
                {currentStep === 7 && (
                  <div>
                    <h1>result</h1>
                    {/* Add content for step 2 here */}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </div>
                )}
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
