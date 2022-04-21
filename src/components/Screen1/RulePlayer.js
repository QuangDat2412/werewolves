import React, { useEffect } from 'react';
import {
    Stack,
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    tableCellClasses,
    experimentalStyled as styled,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

import { useSelector, useDispatch } from 'react-redux';
import { wereWolfSelector, wereWolfActions } from '../../redux/wereWolf.slice';

import Dropdown from './Dropdown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const RulePlayer = () => {
    let dispatch = useDispatch();

    let navigate = useNavigate();

    const players = useSelector(wereWolfSelector.players);


    const formik = useFormik({
        initialValues: players ? players : [],
        onSubmit: (values) => {
            dispatch(wereWolfActions.setPlayers(values));
            navigate('../setup/final', { replace: true });
        },
    });

    const { handleSubmit, values } = formik;


    useEffect(() => {
        dispatch(wereWolfActions.resetGame());
    }, [dispatch]);


    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <Grid container direction="row" justifyContent="center">
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                borderRadius: '16px',
                                padding: '24px',
                                boxShadow: 2,
                                backgroundColor: '#fff',
                            }}
                        >
                            <Stack direction="column" spacing={2}>
                                <Stack direction="column" alignItems="flex-wrap">
                                    <Typography variant="h4"> Step III: </Typography>
                                    <Typography variant="span">Set rules for all players</Typography>
                                </Stack>
                                <Typography variant="h5">Rules</Typography>

                                <Grid container direction="row" justifyContent="center">
                                    <Grid item sm={8} xs={12}>
                                        <TableContainer component={Paper}>
                                            <Table aria-label="customized table">
                                                <TableHead>
                                                    <TableRow sx={{ fontSize: '16px' }}>
                                                        <StyledTableCell align="center" sx={{width:'1em'}}>ID</StyledTableCell>
                                                        <StyledTableCell align="center">Player</StyledTableCell>
                                                        <StyledTableCell align="center">Rule</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {values.map((item, index) => (
                                                        <TableRow key={item.id}>
                                                            <StyledTableCell align="center" sx={{width:'1em'}}>{index + 1}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.name}</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Dropdown ruleID={item.id} formik={formik} rule={item.rule} />
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>

                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        onClick={() => navigate('../setup/step2', { replace: true })}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />

                                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#00254d', width: '48px' }}>
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

export default RulePlayer;
