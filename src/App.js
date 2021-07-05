import './index.css';
import Player from './components/Player';
import Team from './components/Team';
import { useState } from 'react';

function App() {
  const [players, setPlayers] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);

  const addNewPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer])
  }

  return (
    <div className="App">
      <Player addNewPlayer={addNewPlayer}/>
      <Team></Team>
    </div>
  );
}

export default App;
