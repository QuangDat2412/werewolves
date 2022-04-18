import React, { useState, useEffect } from 'react';
import { Stack, Box, Typography, Button, experimentalStyled as styled, Switch, FormControlLabel, Grid, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { wereWolfActions, wereWolfSelector } from '../../redux/wereWolf.slice';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff'
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff'
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const TimeSetup = () => {
    let dispatch = useDispatch();

    let navigate = useNavigate();
    const steps = useSelector(wereWolfSelector.steps);
    const [timeState, setTimeState] = useState([
        { name: 'Discussion', time: 180 },
        { name: 'Vote', time: 10 },
        { name: 'Defense', time: 30 },
        { name: 'Agree', time: 10 },
    ]);

    const [checked, setChecked] = useState(true);

    const handleCheckedDayNight = (e) => {
        setChecked(e.target.checked);
        if (checked) {
            console.log('day');
        } else {
            console.log('night');
        }
    };
    useEffect(() => {
        if (steps[0]) {
            dispatch(wereWolfActions.setCurrentStep(steps[0]));
            navigate('../play', { replace: true });
        }
    }, [steps, dispatch, navigate]);
    const handleStepFinal = () => {
        dispatch(wereWolfActions.setDayTimerDefault(timeState));
        dispatch(wereWolfActions.setSteps(checked));
    };

    const handleChangeTime = ({ name, value }) => {
        const newArray = timeState.map((item) => (item.name === name ? { ...item, time: value } : item));
        setTimeState(newArray);
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" mt={3}>
            <Grid item sm={8} xs={11}>
                <Box
                    sx={{
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: 2,
                        backgroundColor: '#fff',
                    }}
                >
                    <Stack direction="column" spacing={3}>
                        <Typography variant="h4"> Step IV: </Typography>
                        <Typography variant="h5">Set up time </Typography>

                        <Stack textAlign="center" justifyContent="center" alignItems="center">
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }} checked={checked} value="night" />}
                                label="Day/Night"
                                onChange={handleCheckedDayNight}
                                sx={{ color: 'black' }}
                            />

                            <Stack direction="row" spacing={2} sx={{ color: '#00000099' }}>
                                <InfoIcon />
                                <Typography variant="span">Start game by day or night</Typography>
                            </Stack>
                        </Stack>

                        <Grid container direction="row">
                            {timeState.map((item) => (
                                <Grid item sm={6} xs={12} key={item.name} mt={2}>
                                    <Stack direction="row" spacing={3} key={item.name} justifyContent="center" alignItems="center">
                                        <Grid container alignItems="center" justifyContent="center">
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="h5"> {item.name}</Typography>
                                            </Grid>

                                            <Grid item xs={6} sm={6}>
                                                <TextField
                                                    sx={{ marginTop: '20px' }}
                                                    value={item.time}
                                                    onChange={(e) =>
                                                        handleChangeTime({
                                                            name: item.name,
                                                            value: e.target.value,
                                                        })
                                                    }
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button variant="contained" color="inherit" onClick={() => navigate('../setup/step3', { replace: true })} sx={{ mr: 1 }}>
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleStepFinal} variant="contained" sx={{ backgroundColor: '#00254d', width: '48px' }}>
                                Finish
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TimeSetup;
