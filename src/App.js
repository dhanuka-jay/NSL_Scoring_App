import './index.css';
import Player from './components/Players/Player';
import TeamSetup from './components/Game/TeamSetup';
import Navigation from './components/Shared/Navigation';
import Over from './components/Game/Over';
import GameStats from './components/Stats/GameStats';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Path, Switch} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [players, setPlayers] = useState([
    {playerID: uuidv4(), playerFName: 'Sudeera', playerLName: 'Ilandarage'},
    {playerID: uuidv4(), playerFName: 'Punya', playerLName: 'Abayawickrama'},
    {playerID: uuidv4(), playerFName: 'Ranga', playerLName: 'Panagoda'},
    {playerID: uuidv4(), playerFName: 'Casey', playerLName: 'De Silva'},
    {playerID: uuidv4(), playerFName: 'Lahiru', playerLName: 'A'},
    {playerID: uuidv4(), playerFName: 'Anjula', playerLName: 'Ranasinghe'},
    {playerID: uuidv4(), playerFName: 'Saman', playerLName: 'Maharachchi'},
    {playerID: uuidv4(), playerFName: 'Yehan', playerLName: 'Muthukuda'},
    {playerID: uuidv4(), playerFName: 'Lalith', playerLName: 'Jayaweera'},
    {playerID: uuidv4(), playerFName: 'Indika', playerLName: 'A'},
    {playerID: uuidv4(), playerFName: 'Sinzer', playerLName: 'A'},
    {playerID: uuidv4(), playerFName: 'Kapila', playerLName: 'Hapu'},
    {playerID: uuidv4(), playerFName: 'Ruwan', playerLName: 'Weerasekara'},
    {playerID: uuidv4(), playerFName: 'Duvindra', playerLName: 'M'},
    {playerID: uuidv4(), playerFName: 'Lalantha', playerLName: 'A'},
  ]);

  //*** Empty out the arrays before LIVE */
  const [teamA, setTeamA] = useState({teamName: '', players: [
    {playerID: uuidv4(), playerFName: 'Sudeera', playerLName: 'Ilandarage', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Ranga', playerLName: 'Panagoda', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Casey', playerLName: 'De Silva', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Lahiru', playerLName: 'A', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Anjula', playerLName: 'Ranasinghe', batStat: 'NYB'},
    // {playerID: uuidv4(), playerFName: 'Saman', playerLName: 'Maharachchi', batStat: 'NYB'}
  ]});
  const [teamB, setTeamB] = useState({teamName: '', players: [
    {playerID: uuidv4(), playerFName: 'Punya', playerLName: 'Abayawickrama', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Indika', playerLName: 'A', batStat: 'OUT'},
    {playerID: uuidv4(), playerFName: 'Sinzer', playerLName: 'A', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Kapila', playerLName: 'Hapu', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Ruwan', playerLName: 'Weerasekara', batStat: 'NYB'},
    // {playerID: uuidv4(), playerFName: 'Duvindra', playerLName: 'M', batStat: 'NYB'}
  ]});
  const [totOvers, setTotOvers] = useState(15);
  const [overList, setOverList] = useState([]);
  const [totScore, setTotScore] = useState(0);

  const addNewPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer])
  }

  const addToTeam = (team, selectedPlayer) => {
    const teamPlayer = players.find(x => x.playerID === selectedPlayer);
    teamPlayer.batStat = 'NYB';
    teamPlayer.score = 0;
    //console.log(teamPlayer);

    team ==='A' ?
      // setTeamA([...teamA, teamPlayer])
      // :
      // setTeamB([...teamB, teamPlayer])
      setTeamA( prevState => {
        return {...prevState, players: [...teamA.players, teamPlayer]}
      })
      :
      setTeamB( prevState => {
        return {...prevState, players: [...teamB.players, teamPlayer]}
      })
  }

  const setTeamName = (team, tName) => {
    team === 'A' ?
      setTeamA( prevState => {
        return {...prevState, teamName: tName}
      })
    :
      setTeamB( prevState => {
        return {...prevState, teamName: tName}
      })
  }

  const removeFromList = (id) => {
    setTeamA(teamA.filter((player) => player.playerID !== id));
    setTeamB(teamB.filter((player) => player.playerID !== id));
  }

  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="main-container">          
          <Switch>
            <Route exact path="/" >
              <Player addNewPlayer={addNewPlayer}/>
            </Route>          
            <Route path="/teamsetup" >
              <TeamSetup 
                playerList={players}
                addToTeam={addToTeam}
                teamA={teamA}                
                teamB={teamB}
                setTeamName={setTeamName}
                totOvers={totOvers}
                setTotOvers={setTotOvers}
                removeFromList={removeFromList}
              />
            </Route> 
            <Route path="/over">
              <Over 
                teamA={teamA}
                teamB={teamB}
                overList={overList}
                setOverList={setOverList}              
              />
            </Route>
            <Route path="/gamestats">
              <GameStats 
                overList={overList}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
