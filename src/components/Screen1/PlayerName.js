import React from 'react';
import { Stack, Box, Typography, Button, Grid, TextField } from '@mui/material';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import InfoIcon from '@mui/icons-material/Info';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { wereWolfSelector, wereWolfActions } from '../../redux/wereWolf.slice';
import NavBar from './NavBar';

import PersonIcon from '@mui/icons-material/Person';
import uuid from 'react-uuid';

const PlayerName = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const players = useSelector(wereWolfSelector.players);

    const playerNameSchema = Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required(),
        })
    );

    const formik = useFormik({
        initialValues: players ? players : [],
        enableReinitialize: true,
        validationSchema: playerNameSchema,
        onSubmit: (values) => {
            dispatch(wereWolfActions.setPlayerDefault(values));
            navigate('../setup/step3', { replace: true });
        },
    });

    const handleAddPlayer = () => {
        dispatch(
            wereWolfActions.addPlayerDefault({
                id: uuid(),
                name: '',
                rule: 1,
            })
        );
        setValues(players);
    };

    const { handleSubmit, isValid, dirty, errors, touched, values, setValues } = formik;

    const onChangeTextfield = ({ id, value }) => {
        const newArray = values.map((item) => (item.id === id ? { ...item, name: value } : item));
        setValues(newArray);
    };

    return (
        <FormikProvider value={formik}>
            <NavBar />
            <Form onSubmit={handleSubmit}>
                <Grid container direction="row" justifyContent="center" alignItems="center" mt={5}>
                    <Grid item sm={8} xs={11}>
                        <Box
                            sx={{
                                borderRadius: '16px',
                                padding: '24px',
                                boxShadow: 2,
                                backgroundColor: '#f7f7f7',
                            }}
                        >
                            <Stack direction="column" spacing={4}>
                                <Stack direction="column" alignItems="flex-wrap">
                                    <Typography variant="h4"> Step II: </Typography>
                                    <Box>
                                        <Typography variant="span" sx={{ color: '#00254d' }}>
                                            Enter player name
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Typography variant="h5">Name</Typography>

                                <Stack direction="column" spacing={2}>
                                    {values &&
                                        values.map((item, index) => (
                                            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" key={index}>
                                                <Typography variant="h5">{index + 1}</Typography>
                                                <Button sx={{ color: '#00254d' }}>
                                                    <PersonIcon />
                                                </Button>
                                                <TextField
                                                    label="Name"
                                                    name="name"
                                                    variant="outlined"
                                                    value={item.name ? item.name : ''}
                                                    onChange={(e) => {
                                                        onChangeTextfield({
                                                            id: item.id,
                                                            value: e.target.value,
                                                        });
                                                    }}
                                                    error={Boolean(touched.name && errors.name)}
                                                    helperText={touched.name && errors.name}
                                                />
                                            </Stack>
                                        ))}
                                    <Button variant="contained" sx={{ width: '20%' }} onClick={handleAddPlayer}>
                                        Add
                                    </Button>
                                </Stack>

                                <Stack direction="row" spacing={2} sx={{ color: '#00000099' }}>
                                    <InfoIcon />
                                    <Typography variant="span">Players's rule are set default to Village</Typography>
                                </Stack>

                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            navigate('../', { replace: true });
                                        }}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />

                                    <Button
                                        disabled={!(dirty && isValid)}
                                        type="submit"
                                        variant="contained"
                                        sx={{ backgroundColor: '#00254d', width: '48px' }}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
};

export default PlayerName;
