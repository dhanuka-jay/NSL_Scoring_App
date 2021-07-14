import { Form, Button, Modal, Header, Icon, List, Segment, Dropdown } from "semantic-ui-react";
import { useState } from "react";
import TeamMember from "../TeamMember";

const TeamSetup = ({playerList, addToTeam, teamA, teamB, setTeamName, removeFromList, totOvers, setTotOvers}) => {
    const [numOfPlayers, setNumOfPlayers] = useState(6);
    const [teamAName, setTeamAName] = useState('Sudeera');
    const [teamBName, setTeamBName] = useState('Punya');
    const [isTeamA, setIsTeamA] = useState(false);
    const [isTeamB, setIsTeamB] = useState(false);  
    const [overs, setOvers] = useState();
    


    const teamSize = [
        { key: 6, text: '6', value: 6 },
        { key: 7, text: '7', value: 7 },
        { key: 8, text: '8', value: 8 },
        { key: 9, text: '9', value: 9 },
        { key: 10, text: '10', value: 10 },
        { key: 11, text: '11', value: 11 },
      ];

    const totOverOptions = [
        {key: 15, text: '15', value: 15},
        {key: 20, text: '20', value: 20},
        {key: 25, text: '25', value: 25},
        {key: 30, text: '30', value: 30},
        {key: 50, text: '50', value: 50}
    ]


    //Makes a option array from the 'PlayerList' for the dropdown while exluding already added players
    const availablePlayers = () => {
        let plyrOptions = playerList.filter( player => !teamA.players.includes(player.playerID))
            .filter (player => !teamB.players.includes(player.playerID))
            .map((player) =>
             ({key: player.playerID, text: `${player.playerFName} ${player.playerLName}`, value: player.playerID})
        )
        return plyrOptions;
    }

    return (
        <div className="teamsetup-container">
            <div className="player-header">
                <Header as="h1" color="orange">Setup Teams</Header>
            </div>
            <Form>
                <Form.Field>
                <label>Players per Team</label>
                    <Form.Select
                        fluid
                        placeholder="# of players per each team"
                        options={teamSize}
                        value={numOfPlayers}
                        onChange={(e, {value}) => setNumOfPlayers(value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Team 1 - Name</label>
                    <input 
                        placeholder='Give Team 1 a Name here.' 
                        value={teamAName}
                        onChange={(e) => setTeamAName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Team 2 - Name</label>
                    <input 
                        placeholder='Give Team 2 a Name here' 
                        value={teamBName}
                        onChange={(e) => setTeamBName(e.target.value)}
                    />
                </Form.Field>      
                <Form.Field>
                    <label>Number of Overs</label>
                    <Form.Select
                            fluid
                            placeholder='Total Overs (20, 35, 50, ...)' 
                            options={totOverOptions}
                            value={totOvers}
                            onChange={(e, {value}) => setTotOvers(value)}
                        />
                </Form.Field>           
                <Button 
                    content="Create Teams" 
                    icon="group" 
                    labelPosition="right"
                    color="green"
                    onClick={() => {
                            setTeamName('A', teamAName);
                            setTeamName('B', teamBName)
                            setIsTeamA(true)
                        }
                    }
                >
                </Button>
            </Form>

            <Modal
                className="confirm-modal"
                open={isTeamA}
                closeOnEscape={false}
                closeOnDimmerClick={false}
                dimmer='blurring'
                size='large'
                >
                <Modal.Header>Add Players to Team: {teamAName}</Modal.Header>
                <Modal.Content>
                    <Segment>
                        {
                             (numOfPlayers > teamA.players.length || teamA.players.length === 0) ?
                                <Dropdown
                                    fluid
                                    placeholder="Select Players"
                                    options={availablePlayers()}
                                    value=''
                                    onChange={(e, {value}) => addToTeam('A', value)}
                                />
                            :
                            'Your Team is Full!'
                        }
                    </Segment>
                    <Segment>
                        <List divided verticalAlign='middle'>
                            {  
                                teamA.players.length !== 0 ? 
                                teamA.players.map((player) => (
                                    <TeamMember
                                        key={player.playerID} 
                                        player={player}
                                        removeFromList={removeFromList}
                                    />
                                ))
                                :                            
                                'Add your players from above list.'
                            }                
                        </List>
                    </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setIsTeamA(false)}>
                        <Icon name='remove' /> Go Back to Setup
                    </Button>
                    <Button color='green' 
                        onClick={() => {
                            setIsTeamA(false);
                            setIsTeamB(true);                            
                        }}>
                        <Icon name='checkmark' /> Confirm & Move to Team {teamBName}
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                className="confirm-modal"
                open={isTeamB}
                closeOnEscape={false}
                closeOnDimmerClick={false}
                dimmer='blurring'
                size='large'
                >
                <Modal.Header>Add Players to Team: {teamBName}</Modal.Header>
                <Modal.Content>
                    <Segment>
                        {
                             (numOfPlayers > teamB.players.length || teamB.players.length === 0) ?
                                <Dropdown
                                    fluid
                                    placeholder="Select Players"
                                    options={availablePlayers()}
                                    value=''
                                    onChange={(e, {value}) => addToTeam('B', value)}
                                />
                            :
                            'Your Team is Full!'
                        }
                    </Segment>
                    <Segment>
                        <List divided verticalAlign='middle'>
                            {  
                                teamB.players.length !== 0 ? 
                                teamB.players.map((player) => (
                                    <TeamMember
                                        key={player.playerID} 
                                        player={player}
                                        removeFromList={removeFromList}
                                    />
                                ))
                                :                            
                                'Add your players from above list.'
                            }                
                        </List>
                    </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black'   
                        onClick={() => {
                            setIsTeamB(false)
                            setIsTeamA(true);
                        }
                    }>
                        <Icon name='remove' /> Go Back to Team {teamAName}
                    </Button>
                    <Button color='green'>
                    <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default TeamSetup
