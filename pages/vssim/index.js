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
  const [winnerTeam, setWinnerTeam] = useState('');

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
         setWinnerTeam("Team 1");
       } else if (team2Power > team1Power) {
         setWinner(team2Pokemon.name);
         setWinnerTeam("Team 2");
       } else {
         setWinner("Draw");
         setWinnerTeam("None");
       }
    
    setCurrentStep(1);
    setIsBattleClicked(true);
  };
  
  const handleBattle2ButtonClick = () => {
    const team1Pokemon = Team1.pokemonList[1];
    const team2Pokemon = Team2.pokemonList[1];

    const team1Power = Math.floor(Math.random() * 100);
    const team2Power = Math.floor(Math.random() * 100);

 if (team1Power > team2Power) {
      setWinnerStep2(team1Pokemon.name);
      setWinnerTeam("Team 1");
    } else if (team2Power > team1Power) {
      setWinnerStep2(team2Pokemon.name);
      setWinnerTeam("Team 2");
    } else {
      setWinnerStep2("Draw");
      setWinnerTeam("None");
    }   

    setCurrentStep(2);
    setIsBattleClicked(true);
  };

    const handleBattle3ButtonClick = () => {
      const team1Pokemon = Team1.pokemonList[2];
      const team2Pokemon = Team2.pokemonList[2];

      const team1Power = Math.floor(Math.random() * 100);
      const team2Power = Math.floor(Math.random() * 100);

      if (team1Power > team2Power) {
        setWinnerStep3(team1Pokemon.name);
        setWinnerTeam("Team 1");
      } else if (team2Power > team1Power) {
        setWinnerStep3(team2Pokemon.name);
        setWinnerTeam("Team 2");
      } else {
        setWinnerStep3("Draw");
        setWinnerTeam("None");
      }

      setCurrentStep(3);
      setIsBattleClicked(true);
    };

    const handleBattle4ButtonClick = () => {
        const team1Pokemon = Team1.pokemonList[3];
        const team2Pokemon = Team2.pokemonList[3];

        const team1Power = Math.floor(Math.random() * 100);
        const team2Power = Math.floor(Math.random() * 100);

        if (team1Power > team2Power) {
          setWinnerStep4(team1Pokemon.name);
          setWinnerTeam("Team 1");
        } else if (team2Power > team1Power) {
          setWinnerStep4(team2Pokemon.name);
          setWinnerTeam("Team 2");
        } else {
          setWinnerStep4("Draw");
          setWinnerTeam("None");
        }

        setCurrentStep(4);
        setIsBattleClicked(true);
      };

      const handleBattle5ButtonClick = () => {
          const team1Pokemon = Team1.pokemonList[4];
          const team2Pokemon = Team2.pokemonList[4];

          const team1Power = Math.floor(Math.random() * 100);
          const team2Power = Math.floor(Math.random() * 100);

          if (team1Power > team2Power) {
            setWinnerStep5(team1Pokemon.name);
            setWinnerTeam("Team 1");
          } else if (team2Power > team1Power) {
            setWinnerStep5(team2Pokemon.name);
            setWinnerTeam("Team 2");
          } else {
            setWinnerStep5("Draw");
            setWinnerTeam("None");
          }

          setCurrentStep(5);
          setIsBattleClicked(true);
        };

      const handleBattle6ButtonClick = () => {
            const team1Pokemon = Team1.pokemonList[5];
            const team2Pokemon = Team2.pokemonList[5];

            const team1Power = Math.floor(Math.random() * 100);
            const team2Power = Math.floor(Math.random() * 100);

            if (team1Power > team2Power) {
              setWinnerStep6(team1Pokemon.name);
              setWinnerTeam("Team 1");
            } else if (team2Power > team1Power) {
              setWinnerStep6(team2Pokemon.name);
              setWinnerTeam("Team 2");
            } else {
              setWinnerStep6("Draw");
              setWinnerTeam("None");
            }

            setCurrentStep(6);
            setIsBattleClicked(true);
          };
  

const handleNextButtonClick = () => {
  if (currentStep < 7 && isBattleClicked) {
    setCurrentStep(currentStep + 1);
    setIsBattleClicked(false);
  }
};
const getTeamWithMostWins = () => {
  const team1Wins = winnerTeam === "Team 1" ? 1 : 0;
  const team2Wins = winnerTeam === "Team 2" ? 1 : 0;

  // คำนวณจำนวนผู้ชนะในแต่ละขั้น
  const step1Wins = winner === Team1.pokemonList[0].name ? 1 : 0;
  const step2Wins = winnerStep2 === Team1.pokemonList[1].name ? 1 : 0;
  const step3Wins = winnerStep3 === Team1.pokemonList[2].name ? 1 : 0;
  const step4Wins = winnerStep4 === Team1.pokemonList[3].name ? 1 : 0;
  const step5Wins = winnerStep5 === Team1.pokemonList[4].name ? 1 : 0;
  const step6Wins = winnerStep6 === Team1.pokemonList[5].name ? 1 : 0;

  // รวมผู้ชนะในแต่ละขั้น
  const team1TotalWins =
    step1Wins + step2Wins + step3Wins + step4Wins + step5Wins + step6Wins;

  const team2TotalWins = 6 - team1TotalWins;

  // ตรวจสอบเงื่อนไขการชนะและการเสมอ
  if (team1TotalWins > team2TotalWins) {
    return "Team 1";
  } else if (team2TotalWins > team1TotalWins) {
    return "Team 2";
  } else {
    return "Draw";
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
                  <Box>
                    <h1>Step 1</h1>
                    <Box>
                      <h2>Team 1 - Pokemon 1:</h2>
                      {Team1.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team1.pokemonList[0].id)}
                          alt={Team1.pokemonList[0].name}
                        />
                      )}
                    </Box>
                    <Box>
                      <h2>Team 2 - Pokemon 1:</h2>
                      {Team2.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team2.pokemonList[0].id)}
                          alt={Team2.pokemonList[0].name}
                        />
                      )}
                    </Box>
                    <Button onClick={handleBattleButtonClick}>Battle</Button>
                    {winner && (
                      <Box>
                        <h2>Winner:</h2>
                        <p>{winner}</p>
                      </Box>
                    )}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </Box>
                )}

                {currentStep === 2 && (
                  <Box>
                    <Box>
                      <h2>Team 1 - Pokemon 1:</h2>
                      {Team1.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team1.pokemonList[1].id)}
                          alt={Team1.pokemonList[1].name}
                        />
                      )}
                    </Box>
                    <Box>
                      <h2>Team 2 - Pokemon 1:</h2>
                      {Team2.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team2.pokemonList[1].id)}
                          alt={Team2.pokemonList[1].name}
                        />
                      )}
                    </Box>
                    <Button onClick={handleBattle2ButtonClick}>Battle</Button>
                    {winnerStep2 && (
                      <Box>
                        <h2>Winner:</h2>
                        <p>{winnerStep2}</p>
                      </Box>
                    )}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </Box>
                )}
                {currentStep === 3 && (
                  <Box>
                    <Box>
                      <h2>Team 1 - Pokemon 1:</h2>
                      {Team1.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team1.pokemonList[2].id)}
                          alt={Team1.pokemonList[2].name}
                        />
                      )}
                    </Box>
                    <Box>
                      <h2>Team 2 - Pokemon 1:</h2>
                      {Team2.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team2.pokemonList[2].id)}
                          alt={Team2.pokemonList[2].name}
                        />
                      )}
                    </Box>
                    <Button onClick={handleBattle3ButtonClick}>Battle</Button>
                    {winnerStep3 && (
                      <Box>
                        <h2>Winner:</h2>
                        <p>{winnerStep3}</p>
                      </Box>
                    )}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </Box>
                )}
                {currentStep === 4 && (
                  <Box>
                    <Box>
                      <h2>Team 1 - Pokemon 1:</h2>
                      {Team1.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team1.pokemonList[3].id)}
                          alt={Team1.pokemonList[3].name}
                        />
                      )}
                    </Box>
                    <Box>
                      <h2>Team 2 - Pokemon 1:</h2>
                      {Team2.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team2.pokemonList[3].id)}
                          alt={Team2.pokemonList[3].name}
                        />
                      )}
                    </Box>
                    <Button onClick={handleBattle4ButtonClick}>Battle</Button>
                    {winnerStep4 && (
                      <Box>
                        <h2>Winner:</h2>
                        <p>{winnerStep4}</p>
                      </Box>
                    )}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </Box>
                )}
                {currentStep === 5 && (
                  <Box>
                    <Box>
                      <h2>Team 1 - Pokemon 1:</h2>
                      {Team1.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team1.pokemonList[4].id)}
                          alt={Team1.pokemonList[4].name}
                        />
                      )}
                    </Box>
                    <Box>
                      <h2>Team 2 - Pokemon 1:</h2>
                      {Team2.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team2.pokemonList[4].id)}
                          alt={Team2.pokemonList[4].name}
                        />
                      )}
                    </Box>
                    <Button onClick={handleBattle5ButtonClick}>Battle</Button>
                    {winnerStep5 && (
                      <Box>
                        <h2>Winner:</h2>
                        <p>{winnerStep5}</p>
                      </Box>
                    )}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </Box>
                )}
                {currentStep === 6 && (
                  <Box>
                    <Box>
                      <h2>Team 1 - Pokemon 1:</h2>
                      {Team1.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team1.pokemonList[5].id)}
                          alt={Team1.pokemonList[5].name}
                        />
                      )}
                    </Box>
                    <Box>
                      <h2>Team 2 - Pokemon 1:</h2>
                      {Team2.pokemonList.length > 0 && (
                        <img
                          src={getPokemonImageUrl(Team2.pokemonList[5].id)}
                          alt={Team2.pokemonList[5].name}
                        />
                      )}
                    </Box>
                    <Button onClick={handleBattle6ButtonClick}>Battle</Button>
                    {winnerStep6 && (
                      <Box>
                        <h2>Winner:</h2>
                        <p>{winnerStep6}</p>
                      </Box>
                    )}
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </Box>
                )}
                {currentStep === 7 && (
                  <Box>
                    <h1>Result</h1>
                    <p>Winner Team: {getTeamWithMostWins()}</p>
                    <Button onClick={handleNextButtonClick}>Next</Button>
                  </Box>
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
