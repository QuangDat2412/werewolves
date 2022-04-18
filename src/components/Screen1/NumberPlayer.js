import React, {  useState } from "react";
import { Stack, Box, Typography, Button, Slider, Grid, experimentalStyled as styled } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';
import uuid from "react-uuid";

import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { wereWolfActions } from '../../redux/wereWolf.slice';



const NumberPlayer = () => {

  const [valueNumber, setValueNumber] = useState(5);

  const initPersons = [...Array(valueNumber)].map(() => ({
    id: uuid(),
    name: "",
    rule: 1,
  }))

  let navigate = useNavigate()
  let dispatch = useDispatch();

  const onClickHandleNextToStep2 = () => {
    navigate("../setup/step2", { replace: true });
    dispatch(wereWolfActions.setPlayerDefault(initPersons));
  }

  
  return (
    <Grid container direction="row" justifyContent="center" >
     
      <Grid item sm={8} xs={11}  >
        <Box
          sx={{
            borderRadius: "16px",
            padding: "24px",
            boxShadow: 2,
            backgroundColor:"#f7f7f7"
          }}
        >
        <Stack direction="column" spacing={4}>
          <Stack direction="column" alignItems="flex-wrap">
            <Typography variant="h4"> Step I: </Typography>
            <Box>
            <Typography variant="span" sx={{color:"#00254d"}}> Choose number of players </Typography>
          </Box>
            
         
          </Stack>
          <Typography variant="h5">Player Limit - {valueNumber}</Typography>
          <Stack direction="row" spacing={3}>
            <Button sx={{color: '#00254d'}}>
              <PersonIcon />
            </Button>

            <Slider
              className= "slider-number"
              aria-label="Temperature"
              defaultValue={5}
              onChange={(e) => {
                setValueNumber(e.target.value);
              }}
              valueLabelDisplay="auto"
              step={1}
              marks
              sx={{color:"#00254d"}}
             
              min={4}
              max={20}
            />

            <Button sx={{color: '#00254d'}}>
              <GroupsIcon fontSize="large" />
            </Button>
          </Stack>

          <Box>
            <Typography variant="span" sx={{color:"#00254d"}}> You currently selected a player limit of {valueNumber} </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{color:"#00000099"}}>
              <InfoIcon/>
              <Typography variant="span">You can change number of players in step 3 </Typography>
          </Stack>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>

              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={onClickHandleNextToStep2} variant="contained" sx={{backgroundColor:"#00254d", width:"48px"}}>
                Next
              </Button>
            </Box>

          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NumberPlayer;
