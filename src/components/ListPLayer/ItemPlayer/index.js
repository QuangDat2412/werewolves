import React, { useState, Fragment } from 'react';
import { Col, Select, Button, Row, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { wereWolfSelector, wereWolfActions } from '../../../redux/wereWolf.slice';
const { Option } = Select;
const ItemPlayer = ({ player, listPlayer }) => {
    const currentStep = useSelector(wereWolfSelector.currentStep);
    const details = useSelector(wereWolfSelector.details);
    const bodyguard = useSelector(wereWolfSelector.bodyguard);
    const day = useSelector(wereWolfSelector.day);
    const dispatch = useDispatch();
    const _listPlayer = listPlayer.filter((p) => p.lives > 0 && p.id !== player.id);
    const [selected, setSelected] = useState(_listPlayer[0].id);
    const { actions } = currentStep;
    const handleChange = (e) => {
        setSelected(e);
    };
    const renderTitle = () => {
        return (
            <div>
                <div>{`Bạn chắc chắn muốn giết ${player.name} ?`}</div>
                {player.rule === 10 && (
                    <>
                        <div>Thợ săn muốn ai chết cùng</div>
                        <Select
                            defaultValue={_listPlayer[0].id}
                            style={{ width: 150 }}
                            onChange={handleChange}
                            getPopupContainer={(node) => node.parentNode}
                        >
                            {_listPlayer.map((p, idx) => (
                                <Option key={idx} value={p.id}>
                                    {p.name}
                                </Option>
                            ))}
                        </Select>
                    </>
                )}
            </div>
        );
    };
    const currentDetail = details.find((d) => d.id === `${day}.${currentStep.type}.${currentStep.name}`.trim()) || {};

    const showButton = (e, idx) => {
        switch (e) {
            case 'kill':
                return (
                    <Fragment key={idx}>
                        {currentDetail[`killBy${currentStep.name}`.trim()]?.length < currentStep?.kill && player.lives > 0 && (
                            <Popconfirm
                                title={renderTitle}
                                onConfirm={() => {
                                    dispatch(wereWolfActions.doAction({ id: player.id, action: `killBy${currentStep.name}` }));
                                    if (player.rule === 10) {
                                        dispatch(wereWolfActions.doAction({ id: selected, action: 'killByHunter' }));
                                    }
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
                return (
                    <Fragment key={idx}>
                        {currentDetail.helpByWitch.length < currentStep?.help && player.lives === 0 && (
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
                        {currentDetail?.coupleByCupid.length < 2 && currentDetail?.coupleByCupid[0] !== player.id && (
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
                return (
                    <Fragment key={idx}>
                        {(day === 1 || x.helpByGuard[0] !== player.id) && currentDetail.helpByGuard.length < 1 && (
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
                            <div className="img avatar" style={{ backgroundImage: `url(${player.imageUrl})` }}>
                                {player.lives > 0 ? '' : <img className="img" src={'/static/x.png'} alt="" />}
                                {bodyguard === player.id && currentStep.type === 2 && <img className="img" src={'/static/guard.png'} alt="" />}
                            </div>
                        </Col>
                        <Col span={24} className="player-desc">
                            <div>{'Status: ' + (player.lives > 0 ? 'Sống' : 'Chết')}</div>
                            <div>{'Name: ' + player.name}</div>
                            <div>{'Rule: ' + player.rule_name}</div>
                        </Col>
                    </Row>
                    <div className="">{actions?.map((a, idx) => showButton(a, idx))}</div>
                </div>
            </Col>
        </>
    );
};

export default ItemPlayer;
