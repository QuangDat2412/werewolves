import { makeChunkArray } from '../../utils';
import ItemPLayer from './ItemPlayer';
import { Empty, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { wereWolfSelector } from '../../redux/wereWolf.slice';
import './listPlayer.css';
const ListPlayer = () => {
    const listPlayer = useSelector(wereWolfSelector.playersWithRole);

    const showData = () => {
        if (!listPlayer || listPlayer.length === 0) return <Empty />;
        const _listPlayer = makeChunkArray(listPlayer, 2);
        const mapSubList = (subList) =>
            subList.map((item, idx) => {
                return <ItemPLayer key={idx} player={item} listPlayer={listPlayer} />;
            });

        return _listPlayer.map((subList, idx) => (
            <Row gutter={[8, 8]} key={idx} className="row-list-player">
                {mapSubList(subList)}
            </Row>
        ));
    };
    return (
        <Col md={18} xs={24}>
            {showData()}
        </Col>
    );
};

export default ListPlayer;
