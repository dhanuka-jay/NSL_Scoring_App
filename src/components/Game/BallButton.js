import { Button, Icon } from "semantic-ui-react";

const BallButton = ({ball, setOpen, currBall}) => {
    return (
        <div className="over-ball">
            <Icon 
                name='baseball ball' 
                color='red'
                disabled={ball <= currBall ? false : true}
                size='huge'
                onClick={() => setOpen(true)}
            /> 
            <h2>{ball}</h2>
        </div>
    )
}

export default BallButton
