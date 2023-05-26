import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, IconButton, Button, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectTeam, clearTeam, setTeamName } from "../store/teamSlice";
import Navbar from "../components/Navbar";
import axios from "axios";
import StatBar from "components/statbar";

const TeamPage = () => {
  const team = useSelector(selectTeam);
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");
  
const getStatColor = (statName) => {
  switch (statName) {
    case "hp":
      return "#00FF00"; // green color for HP stat
    // Add cases for other stats if needed
    default:
      return ""; // return empty string for other stats
  }
};
  // เมื่อโหลดหน้า TeamPage ให้ตรวจสอบว่ามีชื่อทีมที่เก็บอยู่ใน Local Storage หรือไม่
  useEffect(() => {
    const storedTeamName = localStorage.getItem("teamName");
    if (storedTeamName) {
      setTeamName(storedTeamName);
    }
  }, []);

  // เมื่อมีการเปลี่ยนแปลงชื่อทีม ให้เก็บชื่อทีมใหม่ลงใน Local Storage
  useEffect(() => {
    localStorage.setItem("teamName", teamName);
  }, [teamName]);

  const handleClearTeam = () => {
    dispatch(clearTeam());
  };


  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

 const handleSaveTeam = () => {
   // สร้างข้อมูลทีมที่จะบันทึก
   const teamData = {
     teamName: teamName,
     pokemonList: team.map((pokemon) => {
       const { id, name, stats } = pokemon;
       return {
         id: id,
         name: name,
         stat: stats,
       };
     }),
   };

   // บันทึกข้อมูลทีมลงใน Local Storage
   localStorage.setItem("teamData", JSON.stringify(teamData));

   // สร้างไฟล์ JSON จากข้อมูลทีม
   const fileData = new Blob([JSON.stringify(teamData, null, 2)], {
     type: "application/json",
   });
   const url = URL.createObjectURL(fileData);

   // ดาวน์โหลดไฟล์ JSON
   const link = document.createElement("a");
   link.href = url;
   link.download = `${teamName}.json`;
   link.click();
 };

  return (
    <Box>
      <Navbar />
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
        <Box sx={{ marginTop: "-10rem", marginLeft: "7rem" }}>
          <h1>---- Team Page ----</h1>
          <label>
            Team Name :
            <input
              type="text"
              value={teamName}
              onChange={handleTeamNameChange}
            />
          </label>
          <Button
            sx={{ marginLeft: "1rem" }}
            variant="contained"
            onClick={handleSaveTeam}
          >
            Save Team
          </Button>
          <IconButton onClick={handleClearTeam}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {team && team.length > 0 ? (
            team.map((pokemon) => (
              <Grid sx={{ marginLeft: "7rem" }} item xs={4} key={pokemon.name}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <p
                    style={{
                      fontFamily: "Public Pixel",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {pokemon.name}
                  </p>
                  {pokemon.stats.map((stat) => {
                    if (stat.stat.name === "hp") {
                      return (
                        <Box
                          key={stat.stat.name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                            marginLeft: "0rem",
                            border: "1px solid black",
                            borderRadius: "20px",
                          }}
                        >
                          <img
                            src="/images/tPbdvZ3MLTQdI3CUlmsvf-bg-removed.png"
                            alt="Pokemon Card Deck"
                            className="mb-4"
                            style={{
                              width: "50px",
                              height: "50px",
                              cursor: "pointer",
                              marginLeft: "1rem",
                            }}
                          />
                          <Box
                            style={{
                              width: "60px",
                              marginRight: "0.5rem",
                              textAlign: "right",
                              paddingRight: "10px",
                            }}
                          >
                            {stat.stat.name}:
                          </Box>

                          <Box
                            style={{
                              backgroundColor: "grey",
                              height: "10px",
                              width: "100px",
                              borderRadius: "10px",
                              border: "1px solid black", // เพิ่ม border สีดำ
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
                          <img
                            src={pokemon.imageUrl}
                            alt={pokemon.name}
                            style={{ width: "130px", height: "130px" }}
                          />
                        </Box>
                      );
                    }
                    return null;
                  })}
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={0} sx={{ marginLeft: "27rem" }}>
              <p>No Pokemon in the team.</p>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamPage;
