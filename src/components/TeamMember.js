import { List, Button, Image, Icon } from "semantic-ui-react"

const TeamMember = ({player, removeFromList}) => {

    return (
            <List.Item>
                <List.Content floated="right">
                <Button 
                    color="red" 
                    icon
                    onClick={() => removeFromList(player.playerID)}
                >
                    <Icon name='times' />
                </Button>
                </List.Content>
                <Image size="mini" avatar src='/img/cricketer.png' />
                <List.Content>{`${player.playerFName} ${player.playerLName}`}</List.Content>
            </List.Item>
    )
}

export default TeamMember
