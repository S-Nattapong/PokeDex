import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import HouseIcon from "@mui/icons-material/House";
import SvgIcon from "@mui/material/SvgIcon";
import { Container, TextField, Card, CardContent } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import SearchButton from "../components/SearchButton";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const pokemonIds = Array.from({ length: 500 }, (_, i) => i + 1);

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function getTypeColor(type) {
  switch (type) {
    case "normal":
      return "gray";
    case "fire":
      return "orangered";
    case "water":
      return "dodgerblue";
    case "electric":
      return "gold";
    case "grass":
      return "green";
    case "ice":
      return "aqua";
    case "fighting":
      return "sienna";
    case "poison":
      return "purple";
    case "ground":
      return "sandybrown";
    case "flying":
      return "lightskyblue";
    case "psychic":
      return "hotpink";
    case "bug":
      return "#044220e6";
    case "rock":
      return "brown";
    case "ghost":
      return "rebeccapurple";
    case "dragon":
      return "darkblue";
    case "dark":
      return "darkgray";
    case "steel":
      return "darkslategray";
    case "fairy":
      return "lightpink";
    default:
      return "gray";
  }
}

export default function PokemonAppBar() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayCount, setDisplayCount] = useState(52);
  const batchSize = 52;
  const types = [
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
  ];
  const types1 = ["bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
  const router = useRouter();



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleHomeClick = () => {};

  useEffect(() => {
    const fetchPokemon = async () => {
      const urls = pokemonIds.map((id) => `${baseURL}${id}`);
      try {
        const responses = await axios.all(urls.map((url) => axios.get(url)));
        const pokemonData = responses.map((response) => response.data);
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, []);

  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    if (pokemonList.length > 0) {
      const results = pokemonList.filter((pokemon) => {
        const nameMatches = pokemon.name && pokemon.name.includes(searchTerm);
        const typeMatches =
          selectedTypes.length === 0 ||
          pokemon.types.some((type) => selectedTypes.includes(type.type.name));
        return nameMatches && typeMatches;
      });
      setSearchResults(results);
    }
  }, [searchTerm, selectedTypes, pokemonList]);

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const { data: session } = useSession();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoadMore = () => {
    setDisplayCount(displayCount + batchSize);
  };

  const cardStyle = {
    transform: "scale(1.05)",
  };

  const handleCardHover = (event) => {
    event.currentTarget.style.transform = "scale(1.05)";
    const pokemonName = event.currentTarget
      .querySelector("h3")
      .textContent.toLowerCase();
    const pokemon = pokemonList.find((p) => p.name === pokemonName);
    const typeColor = pokemon
      ? getTypeColor(pokemon.types[0].type.name)
      : "gray";
    event.currentTarget.style.boxShadow = `0px 0px 10px 3px ${typeColor}`;
  };

  const handleCardLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";
  };

  const handleCardClick = (pokemonId) => {
    router.push(`/pokemon/${pokemonId}`);
  };

  const boxStyle = {
    width: "100%",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    borderRadius: "5px",
  };

  return (
    <Box className="App">
      <Head>
        <title>Pokemon Search</title>
        <meta name="description" content="Pokemon search app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "red" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="Box" sx={{ flexGrow: 1 }}>
              <Button color="inherit" onClick={handleHomeClick}>
                <HomeIcon />
              </Button>
            </Typography>
            <Box
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                backgroundColor: alpha("#fff", 0.15),
                marginRight: "8px",
                width: "100%",
              }}
            ></Box>
            <Link href="./signup" passHref>
              <Button
                color="inherit"
                style={{ color: "#fff", marginLeft: "8px" }}
              >
                signup
              </Button>
            </Link>
            {session ? (
              <Button onClick={() => signOut()} color="inherit">
                Logout
              </Button>
            ) : (
              <Button onClick={() => signIn()} color="inherit">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Container
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%vh",
          width: "2000px",
          backgroundColor: "grey",
        }}
      >
        <Box
          maxWidth="lg"
          sx={{
            position: "relative",
            display: "flex",
            gap: "8px",
            gap: "40px",
            height: "80px",
            backgroundColor: "black",
            width: "1500px",
            marginLeft: "-1.3rem",
            padding: "8px",
          }}
        >
          <SearchButton searchTerm={searchTerm} handleSearch={handleSearch} />

          {types.map((type) => (
            <Button
              key={type}
              onClick={() => handleTypeToggle(type)}
              variant={selectedTypes.includes(type) ? "contained" : "outlined"}
              sx={{
                width: "1%",
                height: "20px",
                backgroundColor: selectedTypes.includes(type)
                  ? getTypeColor(type)
                  : "black",
                marginTop: "1rem",
                fontSize: "10px",
                color: selectedTypes.includes(type) ? "white" : "white",
                marginLeft: "-2rem",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: selectedTypes.includes(type)
                    ? getTypeColor(type)
                    : "black",
                },
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
          {types1.map((type) => (
            <Button
              key={type}
              onClick={() => handleTypeToggle(type)}
              variant={selectedTypes.includes(type) ? "contained" : "outlined"}
              sx={{
                width: "1%",
                height: "20px",
                backgroundColor: selectedTypes.includes(type)
                  ? getTypeColor(type)
                  : "black",
                marginTop: "2.5rem",
                fontSize: "10px",
                color: selectedTypes.includes(type) ? "white" : "white",
                marginLeft: "-9.5rem",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: selectedTypes.includes(type)
                    ? getTypeColor(type)
                    : "black",
                },
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </Box>
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {searchResults.slice(0, displayCount).map((pokemon) => (
            <Box
              key={pokemon.id}
              className="pokemon-card"
              style={{
                backgroundColor: "grey",
                borderColor: "black",
                padding: "9px",
                borderRadius: "10px",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                fontFamily: "Courier monospace",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease",
                cursor: "pointer",
                marginTop: "2rem",
              }}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
              onClick={() => handleCardClick(pokemon.id)}
            >
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                width={500}
                height={"auto"}
              />
              <Box
                style={{
                  flexGrow: 1,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  borderRadius: "5px",
                }}
              >
                <h3
                  style={{
                    marginTop: "1rem",
                    marginBottom: "-1.5rem",
                    position: "relative",
                    top: "-30px",
                    textTransform: "capitalize",
                    marginRight: "0",
                  }}
                >
                  {pokemon.name}
                </h3>
                <Box>
                  {pokemon.types.map((type) => (
                    <span
                      key={type.slot}
                      style={{
                        display: "inline-block",
                        backgroundColor: getTypeColor(type.type.name),
                        color: "white",
                        padding: "1px 8px",
                        borderRadius: "4px",
                        marginRight: "5px",
                        fontSize: "13px",
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginLeft: "1rem",
          }}
        >
          <Button onClick={handleLoadMore} color="primary" variant="contained">
            Load More
          </Button>
        </Box>
      </Container>
    </Box>
  );
}