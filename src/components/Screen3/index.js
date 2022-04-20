import React from 'react';
import './index.css';
import Projects from './components/CardLoser';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Screen3 = () => {
    let navigate = useNavigate();

    const countdown = () => {
        navigate('../setup/step3', { replace: true });
    };
    return (
        <div>
            <h1 className="title"> Final result</h1>
            <div className="box-btn--newgame">
                <Button onClick={countdown} type="primary">
                    NewGame
                </Button>
            </div>
            <Projects />
        </div>
    );
};
export default Screen3;
