import './App.css';
import Screen1 from './pages/Screen1';
import Screen2 from './pages/Screen2';
import Screen3 from './components/Screen3';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TimeSetup from './components/Screen1/TimeSetup';
import PlayerName from './components/Screen1/PlayerName';
import RulePlayer from './components/Screen1/RulePlayer';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Screen1 />} />
                        <Route path= '/setup/step2' element= {<PlayerName/>} />
                        <Route path= '/setup/step3' element = {<RulePlayer/>} />
                        <Route path = '/setup/final' element = {<TimeSetup/>} />

                    <Route path="/play" element={<Screen2 />} />
                    <Route path="/finish" element={<Screen3 />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
