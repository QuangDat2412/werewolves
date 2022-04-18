import React from 'react';
import { Stack, Typography, FormControl, MenuItem, Select } from '@mui/material';
import { Rule } from '../../Data';

const Dropdown = ({ ruleID, formik, rule }) => {
    const { setValues, values } = formik;

    const handleChange = ({ id, value }) => {
        const newArray = values.map((item) => (item.id === id ? { ...item, rule: value } : item));
        setValues(newArray);
    };

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" alignItems="center" sx={{ position: 'relative' }}>
                <Typography variant="caption" fontWeight="bold">
                    Rules
                </Typography>
            </Stack>
            <FormControl>
                <Select
                    sx={{ width: '100%' }}
                    value={rule ?? ' '}
                    onChange={(e) => {
                        handleChange({
                            id: ruleID,
                            value: e.target.value,
                        });
                    }}
                    inputProps={{
                        'aria-label': 'Without label',
                    }}
                >
                    {Rule.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
};

export default Dropdown;
