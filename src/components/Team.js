import TeamMember from "./TeamMember";
import { useState } from "react";
import { Button, List, Image } from "semantic-ui-react";

const Team = ({players, addToTeam}) => { 
    return (        
        <div className="team-container">
            <List divided verticalAlign='middle'>
                {
                    players.map((player) => (
                        <TeamMember
                            key={player.playerFName} 
                            player={player}
                            addToTeam={addToTeam}
                        />
                    ))
                }                
            </List>
        </div>
    )
}

export default Team
