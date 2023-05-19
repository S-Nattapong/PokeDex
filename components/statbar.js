import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

// ... other code ...

export default function StatBar() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`${baseURL}${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  if (!pokemon) {
    return <Box>Loading...</Box>;
  }

  const getStatColor = (statName) => {
    switch (statName) {
      case "hp":
        return "#00FF00"; // Red
      case "attack":
        return "#FF0000"; // Orange
      case "defense":
        return "#FFA500"; // Green
      case "special-attack":
        return "#0000FF"; // Blue
      case "special-defense":
        return "#800080"; // Purple
      case "speed":
        return "#0fa0e4"; // Pink
      default:
        return "gray";
    }
  };

  return (
    <Box>
      <h2>Stats:</h2>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        {pokemon.stats.map((stat) => (
          <Box
            key={stat.stat.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              marginLeft: "-4rem",
            }}
          >
            <Box
              style={{
                width: "150px",
                marginRight: "10px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              {stat.stat.name}:
            </Box>
            <Box
              style={{
                backgroundColor: "grey",
                height: "20px",
                width: "300px",
                borderRadius: "10px",
              }}
            >
              <Box
                style={{
                  backgroundColor: getStatColor(stat.stat.name),
                  height: "100%",
                  width: `${(stat.base_stat / 255) * 100}%`,
                  borderRadius: "10px",
                }}
              />
            </Box>
            <Box
              style={{
                marginLeft: "10px",
                paddingLeft: "10px",
              }}
            >
              {stat.base_stat}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
