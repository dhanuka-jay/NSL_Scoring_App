import './index.css';
import Home from './components/Home/Home';
import Player from './components/Players/Player';
import TeamSetup from './components/Game/TeamSetup';
import Navigation from './components/Shared/Navigation';
import Over from './components/Game/Over';
import GameStats from './components/Stats/GameStats';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Path, Switch} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [clubPlayers, setClubPlayers] = useState([
    {playerID: uuidv4(), playerFName: 'Sudeera', playerLName: 'Ilandarage', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Punya', playerLName: 'Abayawickrama', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Ranga', playerLName: 'Panagoda', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Casey', playerLName: 'De Silva', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Lahiru', playerLName: 'A', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Anjula', playerLName: 'Ranasinghe', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Saman', playerLName: 'Maharachchi', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Yehan', playerLName: 'Muthukuda', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Lalith', playerLName: 'Jayaweera', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Indika', playerLName: 'A', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Sinzer', playerLName: 'A', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Kapila', playerLName: 'Hapu', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Ruwan', playerLName: 'Weerasekara', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Duvindra', playerLName: 'M', batStat: 'NYB'},
    {playerID: uuidv4(), playerFName: 'Lalantha', playerLName: 'A', batStat: 'NYB'},
  ]);

  //*** Empty out the arrays before LIVE */
  // const [teamA, setTeamA] = useState({teamName: '', batting: true, players: [
  //   {playerID: uuidv4(), playerFName: 'Sudeera', playerLName: 'Ilandarage', batStat: 'NYB'},
  //   {playerID: uuidv4(), playerFName: 'Ranga', playerLName: 'Panagoda', batStat: 'NYB'},
  //   {playerID: uuidv4(), playerFName: 'Casey', playerLName: 'De Silva', batStat: 'NYB'},
  //   {playerID: uuidv4(), playerFName: 'Lahiru', playerLName: 'A', batStat: 'NYB'},
  //   {playerID: uuidv4(), playerFName: 'Anjula', playerLName: 'Ranasinghe', batStat: 'NYB'},
  //   // {playerID: uuidv4(), playerFName: 'Saman', playerLName: 'Maharachchi', batStat: 'NYB'}
  // ]});
  // const [teamB, setTeamB] = useState({teamName: '', batting: false, players: [
  //   {playerID: uuidv4(), playerFName: 'Punya', playerLName: 'Abayawickrama', batStat: 'NYB'},
  //   {playerID: uuidv4(), playerFName: 'Indika', playerLName: 'A', batStat: 'OUT'},
  //   {playerID: uuidv4(), playerFName: 'Sinzer', playerLName: 'A', batStat: 'NYB'},
  //   {playerID: uuidv4(), playerFName: 'Kapila', playerLName: 'Hapu', batStat: 'NYB'},
  //   {playerID: uuidv4(), playerFName: 'Ruwan', playerLName: 'Weerasekara', batStat: 'NYB'},
  //   // {playerID: uuidv4(), playerFName: 'Duvindra', playerLName: 'M', batStat: 'NYB'}
  // ]});

  const [teamA, setTeamA] = useState({teamName:'', batting: true, players:[]});
  const [teamB, setTeamB] = useState({teamName:'', batting: false, players:[]});
  const [totOvers, setTotOvers] = useState(15);
  const [overList, setOverList] = useState([]);
  const [totScore, setTotScore] = useState(0);

  const addNewPlayer = (newPlayer) => {
    setClubPlayers([...clubPlayers, newPlayer])
  }

  const addToTeam = (team, selectedPlayer) => {
    const teamPlayer = clubPlayers.find(x => x.playerID === selectedPlayer);
    //teamPlayer.batStat = 'NYB';
    //teamPlayer.score = 0;

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

  const setBattingTeam = (toss) => {
    console.log(toss)
    if(toss === 'A'){
      setTeamA( prevState => {
        return {...prevState, batting: true}
      });
      setTeamB( prevState => {
        return {...prevState, batting: false}
      });      
    }
    else if(toss === 'B'){
      setTeamA( prevState => {
        return {...prevState, batting: false}
      });
      setTeamB( prevState => {
        return {...prevState, batting: true}
      }); 
    }
  }

  const removeFromList = (id) => {
    setTeamA( prevState => {
      return {...prevState, players: teamA.players.filter((player) => player.playerID !== id)}
    })

    setTeamB( prevState => {
      return {...prevState, players: teamB.players.filter((player) => player.playerID !== id)}
    })
  }

  return (
    <Router>
      <div className="App">
        <div className="main-border"></div>
        <Navigation />
        <div className="main-border"></div>                
          <Switch> 
            <div className="main-container">  
            <Route exact path="/" >
              <Home />
            </Route> 
            <Route path="/players" >
              <Player 
                addNewPlayer={addNewPlayer}
              />   
            </Route>     
            <Route path="/teamsetup" >
              <TeamSetup 
                playerList={clubPlayers}
                addToTeam={addToTeam}
                teamA={teamA}                
                teamB={teamB}
                setTeamName={setTeamName}
                totOvers={totOvers}
                setTotOvers={setTotOvers}
                setBattingTeam={setBattingTeam}
                removeFromList={removeFromList}
              />
            </Route> 
            <Route path="/over">
              <Over 
                teamA={teamA}
                teamB={teamB}
                overList={overList}
                clubPlayers={clubPlayers}
                setOverList={setOverList}              
              />
            </Route>
            <Route path="/gamestats">
              <GameStats 
                overList={overList}
              />
            </Route>
            </div>
          </Switch>        
      </div>
    </Router>
  );
}

export default App;
