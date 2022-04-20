import React, { Fragment } from 'react';
import { Col, Button, Row, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { wereWolfSelector, wereWolfActions } from '../../../redux/wereWolf.slice';
const ItemPlayer = ({ player, listPlayer }) => {
    const currentStep = useSelector(wereWolfSelector.currentStep);
    const details = useSelector(wereWolfSelector.details);
    const couple = useSelector(wereWolfSelector.couple);
    const bodyguard = useSelector(wereWolfSelector.bodyguard);
    const diseased = useSelector(wereWolfSelector.diseased);
    const hunter = useSelector(wereWolfSelector.hunter);
    const oldManLive = useSelector(wereWolfSelector.oldManLive);
    const day = useSelector(wereWolfSelector.day);
    const dispatch = useDispatch();
    const { actions } = currentStep;

    const currentDetail = details.find((d) => d.id === `${day}.${currentStep.type}.${currentStep.name}`.trim()) || {};
    const showButton = (e, idx) => {
        const checkLive =
            currentStep.player &&
            currentStep.player.reduce((p, id) => {
                return p || id === -1 || listPlayer.find((p) => p.rule === id)?.lives > 0;
            }, false);
        switch (e) {
            case 'select':
                const a =
                    checkLive &&
                    currentDetail[`selectBy${currentStep.name}`.trim()]?.length < currentStep?.select &&
                    player.lives > 0 &&
                    player.rule !== 10;
                return (
                    <Fragment key={idx}>
                        {a && (
                            <Popconfirm
                                title={`Bạn chắc chắn muốn chọn ${player.name} ?`}
                                onConfirm={() => {
                                    dispatch(wereWolfActions.doAction({ id: player.id, action: `selectBy${currentStep.name}` }));
                                }}
                                okText="Yes"
                                cancelText="No"
                                key={idx}
                                placement="bottom"
                            >
                                <Button type="danger">Chọn</Button>
                            </Popconfirm>
                        )}
                    </Fragment>
                );
            case 'kill':
                const checkKill =
                    (oldManLive || currentStep.name !== 'witch') &&
                    (day !== 1 ? day - 1 !== diseased || currentStep.name !== 'Agree' || currentStep.name !== 'witch' : true) &&
                    checkLive &&
                    currentDetail[`killBy${currentStep.name}`.trim()]?.length < currentStep?.kill &&
                    player.lives > 0;
                return (
                    <Fragment key={idx}>
                        {checkKill && (
                            <Popconfirm
                                title={`Bạn chắc chắn muốn giết ${player.name} ?`}
                                onConfirm={() => {
                                    dispatch(wereWolfActions.doAction({ id: player.id, action: `killBy${currentStep.name}` }));
                                }}
                                okText="Yes"
                                cancelText="No"
                                key={idx}
                                placement="bottom"
                            >
                                <Button type="danger">Giết</Button>
                            </Popconfirm>
                        )}
                    </Fragment>
                );
            case 'help':
                const soican = details.find((d) => d.id === `${day}.${currentStep.type}.wolf`.trim());

                const checkHelp =
                    oldManLive &&
                    checkLive &&
                    currentDetail.helpByWitch?.length < currentStep?.help &&
                    soican.killBywolf.find((id) => id === player.id);
                return (
                    <Fragment key={idx}>
                        {checkHelp && (
                            <Popconfirm
                                title={`Bạn có chắc chắn muốn cứu ${player.name}`}
                                onConfirm={() => {
                                    dispatch(wereWolfActions.doAction({ id: player.id, action: 'helpByWitch' }));
                                }}
                                okText="Yes"
                                cancelText="No"
                                key={idx}
                                placement="bottom"
                            >
                                <Button onClick={() => {}} type="primary">
                                    Cứu
                                </Button>
                            </Popconfirm>
                        )}
                    </Fragment>
                );
            case 'couple':
                return (
                    <Fragment key={idx}>
                        {currentDetail?.coupleByCupid?.length < 2 && currentDetail?.coupleByCupid[0] !== player.id && (
                            <Popconfirm
                                title={`Bạn có chắc chắn muốn kết đôi`}
                                onConfirm={() => {
                                    dispatch(wereWolfActions.doAction({ id: player.id, action: 'coupleByCupid' }));
                                }}
                                okText="Yes"
                                cancelText="No"
                                placement="bottom"
                            >
                                <Button type="primary">Kết đôi</Button>
                            </Popconfirm>
                        )}
                    </Fragment>
                );
            case 'guard':
                const x = details.find((d) => d.id === `${day - 1}.${currentStep.type}.${currentStep.name}`.trim());

                const checkGuard =
                    oldManLive &&
                    checkLive &&
                    (day === 1 || x.helpByGuard[0] !== player.id) &&
                    currentDetail.helpByGuard?.length < 1 &&
                    player.lives > 0;
                return (
                    <Fragment key={idx}>
                        {checkGuard && (
                            <Popconfirm
                                title={`Bạn có chắc chắn muốn bảo vệ ${player.name}`}
                                onConfirm={() => {
                                    dispatch(wereWolfActions.doAction({ id: player.id, action: 'helpByGuard' }));
                                }}
                                okText="Yes"
                                cancelText="No"
                                placement="bottom"
                            >
                                <Button type="primary">Bảo vệ</Button>
                            </Popconfirm>
                        )}
                    </Fragment>
                );

            default:
                break;
        }
    };

    return (
        <>
            <Col md={12} xs={12}>
                <div className="player-item">
                    <Row>
                        <Col span={24}>
                            <div className="img avatar" style={{ backgroundImage: `url(${player?.imageUrl})` }}>
                                {player?.lives > 0 ? '' : <img className="img" src={'/static/x.png'} alt="" />}
                            </div>
                        </Col>
                        <Col span={24} className="player-desc">
                            <div>{'Status: ' + (player?.lives > 0 ? 'Sống' : 'Chết')}</div>
                            <div>{'Name: ' + player?.name}</div>
                            <div>{'Rule: ' + player?.rule_name}</div>
                            <div className="box-btn-action">
                                {couple.find((c) => c === player?.id) && <img className="img-tim" src={'/static/heart.png'} alt="" />}
                                {bodyguard === player?.id && currentStep.type === 2 && <img className="img-tim" src={'/static/guard.png'} alt="" />}
                                {hunter[0] === player?.id && currentStep.type === 2 && <img className="img-tim" src={'/static/gun.png'} alt="" />}
                                {(currentDetail?.helpByWitch ? currentDetail.helpByWitch[0] : '') === player?.id && currentStep.type === 2 && (
                                    <img className="img-tim" src={'/static/hospital.png'} alt="" />
                                )}
                                {(currentDetail?.killBywolf ? currentDetail.killBywolf[0] : '') === player?.id ||
                                    (currentDetail?.killByAgree ? currentDetail.killByAgree[0] : '') === player?.id ||
                                    ((currentDetail?.killBywitch ? currentDetail.killBywitch[0] : '') === player.id && (
                                        <img className="img-tim" src={'/static/gun.png'} alt="" />
                                    ))}
                            </div>
                        </Col>
                    </Row>
                    <div className="">{actions?.map((a, idx) => showButton(a, idx))}</div>
                </div>
            </Col>
        </>
    );
};

export default ItemPlayer;
