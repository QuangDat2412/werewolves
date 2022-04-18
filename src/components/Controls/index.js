import './controls.css';
import { useState, useEffect, useRef } from 'react';
import { Button, Col, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { wereWolfSelector, wereWolfActions } from '../../redux/wereWolf.slice';
import InfiniteScroll from 'react-infinite-scroll-component';

const Controls = () => {
    const dispatch = useDispatch();
    const currentStep = useSelector(wereWolfSelector.currentStep);
    const playersWithRole = useSelector(wereWolfSelector.playersWithRole);
    const details = useSelector(wereWolfSelector.details);
    const steps = useSelector(wereWolfSelector.steps);
    const [time, setTime] = useState(parseInt(currentStep.time));

    const interval = useRef();
    const getPlayer = (id) => {
        return playersWithRole.find((p) => p.id === id);
    };
    const countdown = () => {
        if (time > 0) {
            console.log(time);
            interval.current = setInterval(() => {
                setTime((t) => t - 1);
            }, 1000);
        } else {
            clearInterval(interval.current);
        }
    };
    useEffect(() => {
        if (time <= 0) {
            clearInterval(interval.current);
        }
    }, [time]);

    const onChange = (a) => {
        const index = steps.findIndex((s) => {
            return s.name === currentStep.name;
        });
        if (index + 1 === steps.length) {
            dispatch(wereWolfActions.setCurrentStep(steps[0]));
        } else {
            dispatch(wereWolfActions.setCurrentStep(steps[index + 1]));
        }
    };
    const reset = () => {
        dispatch(wereWolfActions.resetStep());
        clearInterval(interval.current);
        setTime(parseInt(currentStep.time));
    };

    const showData = () => {
        return (
            <>
                {details.map((d, idx) => {
                    const arr = d.id.split('.');
                    return (
                        <li key={idx}>
                            <ul style={{ padding: 0 }}>
                                {d.coupleByCupid.length === 2 && (
                                    <li>{`${parseInt(arr[1]) === 1 ? 'Ngày' : 'Đêm '} thứ ${arr[0]} - ${
                                        getPlayer(d.coupleByCupid[0]).name
                                    } được ghép đôi với ${getPlayer(d.coupleByCupid[1]).name}`}</li>
                                )}
                                {d.helpByGuard.length > 0 && (
                                    <li>{`${parseInt(arr[1]) === 1 ? 'Ngày' : 'Đêm '} thứ ${arr[0]} - ${
                                        getPlayer(d.helpByGuard[0]).name
                                    } đã được bảo vệ.`}</li>
                                )}
                                {d.killByAgree.length > 0 && (
                                    <li>{`${parseInt(arr[1]) === 1 ? 'Ngày' : 'Đêm '} thứ ${arr[0]} - ${
                                        getPlayer(d.killByAgree[0]).name
                                    } đã bị dân làng treo cổ`}</li>
                                )}
                                {d.killByHunter.length > 0 && (
                                    <li>{`${parseInt(arr[1]) === 1 ? 'Ngày' : 'Đêm '} thứ ${arr[0]} - ${
                                        getPlayer(d.killByHunter[0]).name
                                    } được chọn chết cùng thợ săn`}</li>
                                )}
                                {d.killBywolf.length > 0 && (
                                    <li>{`${parseInt(arr[1]) === 1 ? 'Ngày' : 'Đêm '} thứ ${arr[0]} - ${
                                        getPlayer(d.killBywolf[0]).name
                                    } đã bị giết bởi sói`}</li>
                                )}
                                {d.killBywitch.length > 0 && (
                                    <li>{`${parseInt(arr[1]) === 1 ? 'Ngày' : 'Đêm '} thứ ${arr[0]} - ${
                                        getPlayer(d.killBywitch[0]).name
                                    } đã bị giết bởi phù thủy`}</li>
                                )}
                                {d.helpByWitch.length > 0 && (
                                    <li>{`${parseInt(arr[1]) === 1 ? 'Ngày' : 'Đêm '} thứ ${arr[0]} - ${
                                        getPlayer(d.helpByWitch[0]).name
                                    } đã được cứu bởi phù thủy`}</li>
                                )}
                            </ul>
                        </li>
                    );
                })}
            </>
        );
    };
    return (
        <Col md={6} xs={24}>
            <div className="countdown">{currentStep.title + ' trong ' + time + 's'}</div>
            <div className="content">
                <div>Note: {currentStep.desc}</div>;
                <InfiniteScroll dataLength={details.length} scrollableTarget="scrollableDiv">
                    <ul className="media-list stack-media-on-mobile" style={{ height: 150 }}>
                        {showData()}
                    </ul>
                </InfiniteScroll>
                <div className="controls-btn">
                    <Popconfirm title={`Bạn có chắc chắn muốn tiếp tục`} onConfirm={reset} okText="Yes" cancelText="No" placement="bottom">
                        <Button type="primary">Reset</Button>
                    </Popconfirm>
                    <Button onClick={countdown} type="primary">
                        Start
                    </Button>
                    <Popconfirm title={`Bạn có chắc chắn muốn tiếp tục`} onConfirm={onChange} okText="Yes" cancelText="No" placement="bottom">
                        <Button type="primary">Next</Button>
                    </Popconfirm>
                </div>
            </div>
        </Col>
    );
};

export default Controls;
