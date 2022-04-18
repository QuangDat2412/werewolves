import './countdown.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
function Countdown() {
    return (
        <div className="countdown">
            <CountdownCircleTimer isPlaying duration={20} colors={['#004777', '#F7B801', '#A30000', '#A30000']} colorsTime={[7, 5, 2, 0]}>
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    );
}

export default Countdown;
