import React, { useState } from 'react';
import { Stack } from '@mui/material';

import NumberPlayer from '../../components/Screen1/NumberPlayer';

import NavBar from '../../components/Screen1/NavBar';

const Screen1 = () => {
    const [valueNumber, setValueNumber] = useState(5);

    return (
        <Stack spacing={5} alignItems="center" justifyContent="center">
            <NavBar />
            <NumberPlayer valueNumber={valueNumber} setValueNumber={setValueNumber} />
        </Stack>
    );
};

export default Screen1;
