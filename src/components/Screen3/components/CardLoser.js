import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ReactCardFlip from 'react-card-flip';
import { useSelector } from 'react-redux';
import { wereWolfSelector } from '../../../redux/wereWolf.slice';

const CardLoser = ({ data }) => {
    const [isFlipped, setFlipped] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setFlipped((preState) => {
            return !preState;
        });
    };

    return (
        <Card onClick={handleClick} sx={{ maxWidth: 400, height: '100%' }} key={data.id}>
            <ReactCardFlip style isFlipped={isFlipped} flipDirection="horizontal">
                <div>
                    <CardMedia
                        component="img"
                        width="100%"
                        image={data.imageUrl ? data.imageUrl : '/static/masoi.png'}
                        alt="avatar"
                        align-items="flex-end"
                    />
                    <Typography
                        wordBreak="break-word"
                        gutterBottom
                        variant="h5"
                        component="div"
                        marginTop="0.5em"
                        sx={{ textAlign: 'center', alignContent: 'center' }}
                    >
                        {data.name}
                    </Typography>
                </div>
                <section className="asdfdsfsdf" style={{ width: '100%', height: '100%' }}>
                    <CardContent>
                        <Typography variant="body2" sx={{ textAlign: 'center', alignContent: 'center' }}>
                            {data.die
                                ? `${data.name}(${data.rule_name}) ${data.die?.message} - ${data.die?.type === 1 ? 'Ngày' : 'Đêm'} thứ ${
                                      data.die?.day
                                  }`
                                : `${data.name}(${data.rule_name}) còn sống`}
                        </Typography>
                    </CardContent>
                </section>
            </ReactCardFlip>
        </Card>
    );
};
const Projects = () => {
    const playersWithRole = useSelector(wereWolfSelector.playersWithRole);
    const died = useSelector(wereWolfSelector.died);
    const _playersWithRole = playersWithRole.map((p) => {
        const x = died.find((x) => x.id === p.id);
        return { ...p, die: x };
    });
    return (
        <div style={{ margin: 'auto' }} className="Projects">
            <Grid container spacing={3} justifyContent="center" textAlign="center" className="box-center">
                {_playersWithRole.length !== 0 &&
                    _playersWithRole.map((item, index) => (
                        <Grid item xs={6} sm={6} alignItems="center" key={`card-${index}`} justifyContent="center">
                            <CardLoser data={item} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};
export default Projects;
