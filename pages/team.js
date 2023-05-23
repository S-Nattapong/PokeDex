import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectTeam, clearTeam, setTeamName } from "../store/teamSlice";
import Navbar from "../components/Navbar";
import axios from "axios";

const TeamPage = () => {
  const team = useSelector(selectTeam);
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");
  

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
        <Box>
          <h1>Team Page</h1>
          <label>
            Team Name:
            <input
              type="text"
              value={teamName}
              onChange={handleTeamNameChange}
            />
          </label>
          {team && team.length > 0 ? (
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              {team.map((pokemon) => (
                <Box key={pokemon.name}>
                  <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <p>{pokemon.name}</p>
                </Box>
              ))}
            </Box>
          ) : (
            <p>No Pokemon in the team.</p>
          )}
          <IconButton onClick={handleClearTeam}>
            <DeleteIcon />
          </IconButton>
          <Button variant="contained" onClick={handleSaveTeam}>
            Save Team
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TeamPage;
