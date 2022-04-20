import './controls.css';
import { useState, useEffect, useRef } from 'react';
import { Button, Col, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { wereWolfSelector, wereWolfActions } from '../../redux/wereWolf.slice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const Controls = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const currentStep = useSelector(wereWolfSelector.currentStep);
    const playersWithRole = useSelector(wereWolfSelector.playersWithRole);
    const died = useSelector(wereWolfSelector.died);
    const details = useSelector(wereWolfSelector.details);
    const steps = useSelector(wereWolfSelector.steps);
    const [time, setTime] = useState(parseInt(currentStep.time));
    const [start, setStart] = useState(parseInt(false));
    const interval = useRef();
    const getPlayer = (id) => {
        const p = playersWithRole.find((p) => p.id === id);
        return `${p.name}(${p.rule_name})`;
    };
    const countdown = () => {
        if (time > 0) {
            interval.current = setInterval(() => {
                setTime((t) => t - 1);
            }, 1000);
        } else {
            clearInterval(interval.current);
        }
        setStart(true);
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
        dispatch(wereWolfActions.doActionSuccess());
        if (index + 1 === steps?.length) {
            dispatch(wereWolfActions.setCurrentStep(steps[0]));
            clearInterval(interval.current);
            setTime(parseInt(steps[0].time));
        } else {
            dispatch(wereWolfActions.setCurrentStep(steps[index + 1]));
            clearInterval(interval.current);
            setTime(parseInt(steps[index + 1].time));
        }
        setStart(false);
    };
    const reset = () => {
        dispatch(wereWolfActions.resetStep());
        clearInterval(interval.current);
        setTime(parseInt(currentStep.time));
        setStart(false);
    };
    const endGame = () => {
        navigate('../finish', { replace: true });
    };
    // const newDetails = details
    let listDay = new Set(details.map((d) => d.day));
    listDay = Array.from(listDay);
    const result = listDay.reduce((p, n) => {
        const filterByDay = details.filter((d) => d.day === n) || [];
        const filterByType1 = filterByDay.filter((d) => d.type === 1) || [];
        const filterByType2 = filterByDay.filter((d) => d.type === 2) || [];
        return { ...p, [n]: { night: filterByType2, day: filterByType1 } };
    }, {});

    const showData = () => {
        return (
            <>
                {Object.keys(result).map((key1, index1) => {
                    const filterDiedByDay = died.filter((d) => d.day === parseInt(key1)) || [];
                    return (
                        <li key={index1}>
                            {`Ngày thứ ${key1}`}
                            {Object.keys(result[key1]).map((key2, index2) => {
                                return (
                                    <div key={index2}>
                                        {result[key1][key2].length > 0 && (
                                            <>
                                                {key2 === 'day' && 'Ngày'}
                                                {key2 === 'night' && 'Đêm'}
                                                {result[key1][key2].map((d, index3) => {
                                                    const a = [
                                                        ...d.coupleByCupid,
                                                        ...d.killCouple,
                                                        ...d.selectByhunter,
                                                        ...d.helpByGuard,
                                                        ...d.killByAgree,
                                                        ...d.killBywolf,
                                                        ...d.killBywitch,
                                                        ...d.killByhunter,
                                                        ...d.helpByWitch,
                                                    ];
                                                    return (
                                                        <div key={index3}>
                                                            {a.length > 0 && (
                                                                <ol style={{ padding: 0 }}>
                                                                    {d.coupleByCupid?.length === 2 && (
                                                                        <li>{`${getPlayer(d.coupleByCupid[0])} được ghép đôi với ${getPlayer(
                                                                            d.coupleByCupid[1]
                                                                        )}`}</li>
                                                                    )}
                                                                    {d.killCouple?.length === 2 && (
                                                                        <li>{`${getPlayer(d.killCouple[0])} và ${getPlayer(
                                                                            d.killCouple[1]
                                                                        )} đã chết cùng nhau`}</li>
                                                                    )}
                                                                    {d.selectByhunter?.length > 0 && (
                                                                        <li>{`${getPlayer(d.selectByhunter[0])} được chọn bởi thợ săn`}</li>
                                                                    )}
                                                                    {d.helpByGuard?.length > 0 && (
                                                                        <li>{`${getPlayer(d.helpByGuard[0])} đã được bảo vệ.`}</li>
                                                                    )}
                                                                    {d.killByAgree?.length > 0 && (
                                                                        <li>{`${getPlayer(d.killByAgree[0])} đã bị dân làng treo cổ`}</li>
                                                                    )}
                                                                    {d.killBywolf?.length > 0 && (
                                                                        <li>{`${getPlayer(d.killBywolf[0])} đã bị sói cắn`}</li>
                                                                    )}
                                                                    {d.killBywitch?.length > 0 && (
                                                                        <li>{`${getPlayer(d.killBywitch[0])} đã bị giết bởi phù thủy`}</li>
                                                                    )}
                                                                    {d.killByHunter?.length > 0 && (
                                                                        <li>{`${getPlayer(d.killByHunter[0])} bị thợ săn bắn chết`}</li>
                                                                    )}
                                                                    {d.helpByWitch?.length > 0 && (
                                                                        <li>{`${getPlayer(d.helpByWitch[0])} đã được cứu bởi phù thủy`}</li>
                                                                    )}
                                                                </ol>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                            <div style={{ color: 'red' }}>
                                {filterDiedByDay.length > 0 && (
                                    <>
                                        {`Tổng kết ngày thứ ${key1}`}
                                        {filterDiedByDay.map((d, idx) => {
                                            return (
                                                <ol style={{ padding: 0 }} key={idx}>
                                                    {d.name === 'wolfKillYoungStrongMan' && <li>{`${getPlayer(d.id)} ${d.message}`}</li>}
                                                    {d.name === 'killCouple' && <li>{`${getPlayer(d.id)} ${d.message}`}</li>}
                                                    {d.name === 'killByAgree' && <li>{`${getPlayer(d.id)} ${d.message}`}</li>}
                                                    {d.name === 'killBywolf' && <li>{`${getPlayer(d.id)} ${d.message}`}</li>}
                                                    {d.name === 'killBywitch' && <li>{`${getPlayer(d.id)} ${d.message}`}</li>}
                                                    {d.name === 'killByhunter' && <li>{`${getPlayer(d.id)} ${d.message}`}</li>}
                                                </ol>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </>
        );
    };
    return (
        <>
            <div className="controls-btn">
                <Popconfirm title={`Bạn có chắc chắn muốn kết thúc game`} onConfirm={endGame} okText="Yes" cancelText="No" placement="bottom">
                    <Button type="primary">End Game</Button>
                </Popconfirm>
                <Popconfirm title={`Bạn có chắc chắn muốn reset`} onConfirm={reset} okText="Yes" cancelText="No" placement="bottom">
                    <Button type="primary">Reset</Button>
                </Popconfirm>
                <Button onClick={countdown} disabled={start} type="primary">
                    Start
                </Button>
                <Popconfirm title={`Bạn có chắc chắn muốn tiếp tục`} onConfirm={onChange} okText="Yes" cancelText="No" placement="bottom">
                    <Button type="primary">Next</Button>
                </Popconfirm>
            </div>
            <Col md={6} xs={24}>
                <div className="countdown">{currentStep.title + ' trong ' + time + 's'}</div>
                <div className="content">
                    <div>Note: {currentStep.desc}</div>
                    <InfiniteScroll dataLength={details?.length} scrollableTarget="scrollableDiv">
                        <ul className="media-list stack-media-on-mobile" style={{ height: 250 }}>
                            {showData()}
                        </ul>
                    </InfiniteScroll>
                </div>
            </Col>
        </>
    );
};

export default Controls;
