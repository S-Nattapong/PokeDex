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
import Link from "next/link";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export default function ButtonAppBar() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            <Link href="./vssim" passHref>
              <Button
                color="inherit"
                sx={{
                  width: "fit-content",
                  height: "fit-content",
                  padding: 0,
                  border: "none",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  marginLeft:"15rem"
                }}
              >
                <img
                  src="/images/versus.png"
                  alt="Pokemon Card Deck"
                  className="mb-4"
                  style={{
                    maxWidth: "40%",
                    maxHeight: "auto",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </Button>
            </Link>
            <Link href="./signup" passHref>
              <Button
                color="inherit"
                style={{ color: "#fff", marginLeft: "8px" }}
              >
                signup
              </Button>
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
