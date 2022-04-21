import './index.css';
import Controls from '../../components/Controls';
import ListPLayer from '../../components/ListPLayer';
import NightImg from '../../assets/images/background.png';
import { useSelector } from 'react-redux';
import { wereWolfSelector } from '../../redux/wereWolf.slice';
import { Row } from 'antd';
const Screen2 = () => {
    const currentStep = useSelector(wereWolfSelector.currentStep) || {};

    return (
        <div className="screen2" style={{ backgroundImage: `url(${NightImg})` }}>
            <Row className="mask" style={{ backgroundColor: `${currentStep.type === 2 ? 'rgba(13, 14, 14, 0.9)' : ''}` }}>
                <Controls />
                <ListPLayer />
            </Row>
        </div>
    );
};

export default Screen2;
