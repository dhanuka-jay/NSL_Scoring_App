
import { useState } from "react";
import { Button, List, Image } from "semantic-ui-react";

const Team = () => { 


    return (
        <div className="team-container">
            <List divided verticalAlign='middle'>
                <List.Item>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
                <Image avatar src='../cricketer.png' />
                <List.Content>Lena</List.Content>
                </List.Item>
                <List.Item>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
                <Image avatar src='./cricketer.png' />
                <List.Content>Lindsay</List.Content>
                </List.Item>
                <List.Item>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
                <Image avatar src='./cricketer.png' />
                <List.Content>Mark</List.Content>
                </List.Item>
                <List.Item>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
                <Image avatar src='./cricketer.png' />
                <List.Content>Molly</List.Content>
                </List.Item>
            </List>
        </div>
    )
}

export default Team
