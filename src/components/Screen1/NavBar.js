import React from 'react'
import {

    Typography,
  
    experimentalStyled as styled,
  } from "@mui/material";
  

const StyledTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      fontSize: "78px",
    },
  }));

const NavBar = () => {
  return (
    <StyledTypography
    variant="h4"
    sx={{
      color: "#00254C",
      fontWeight: "700",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
    Werewolf Online
  </StyledTypography>
  )
}

export default NavBar