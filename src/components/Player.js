import { useState } from "react";
import { Header, Form, Button } from "semantic-ui-react";

const Player = ({addNewPlayer}) => {
    const [playerFName, setPlayerFName] = useState('');
    const [playerLName, setPlayerLName] = useState('');

    const addPlayer = () => {
        addNewPlayer({playerFName: playerFName, playerLName: playerLName});
        clearFields();
    }

    const clearFields = () => {
        setPlayerFName('');
        setPlayerLName('');
    }

    return (
        <div className="player-container"> 
            <div className="player-header">
                <Header as="h1" color="orange">Add New Player</Header>
            </div>
            <Form>
                <Form.Field>
                    <label>First Name</label>
                    <input 
                        placeholder='First Name' 
                        value={playerFName}
                        onChange={(e) => setPlayerFName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input 
                        placeholder='Last Name' 
                        value={playerLName}
                        onChange={(e) => setPlayerLName(e.target.value)}
                    />
                </Form.Field>                
                <Button 
                    content="Create Player" 
                    icon="plus" 
                    labelPosition="right"
                    color="green"
                    onClick={addPlayer}
                >
                </Button>
            </Form>
        </div>
    )
}

export default Player
