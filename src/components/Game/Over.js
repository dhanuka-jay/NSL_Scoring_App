
import { useState, useEffect, useRef } from "react";
import { Button, Dropdown, Modal, Segment, Divider, Label, Icon } from "semantic-ui-react";
import BallButton from "./BallButton";

const Over = ({teamA, teamB, overList, clubPlayers, setOverList}) => {
    const [open, setOpen] = useState(false);
    const [isBatStatOpen, setIsBatStatOpen] = useState(false);
    const [scoreType, setScoreType] = useState('');
    const [runs, setRuns] = useState();
    const [over, setOver] = useState([]);
    const [bowler, setBowler] = useState('');
    const [batsman1, setBatsman1] = useState('');
    const [batsman2, setBatsman2] = useState('');
    const [notReady, setNotReady] = useState(true);
    const [currOver, setCurrOver] = useState(0);
    const [currBall, setCurrBall] = useState(1);
    const [currBatsman, setCurrBatsman] = useState();

    const ballsOfTheOver = [1,2,3,4,5,6];

    const runOptions = [
        { key: 0, text: '0', value: 0 },
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 },
        { key: 6, text: '6', value: 6 },
        { key: 5, text: '5', value: 5 },
        { key: 7, text: '7', value: 7 }
      ]

    const scoreTypeOptions = [
        { key: 1, text: 'Wide-Ball', value: 'wide' },
        { key: 2, text: 'No-Ball', value: 'no' },
        { key: 3, text: 'Byes', value: 'byes' }
      ]

    const batsmanOptions = [
        {key: 1, text: {batsman1}, value: {batsman1}},
        {key: 2, text: {batsman2}, value: {batsman2}}
    ]

       
    /* 
        getBattingPlayers() => Options for two batsman-dropdowns. 
        'batNumber' is used to filter out already selected player from the list.
        ie: if 'Batsman 1' is already selected from the dropdown, he will not be shown in the 'Batsman 2' dropdown.
    */
    const getBattingPlayers = (batNumber) => {
        const battingPlayers = 
        (batNumber === 1) ?
        (teamA.batting === true ? teamA : teamB).players.filter( plyr => plyr.batStat !== 'OUT')
            .filter(player => player.playerID !== batsman2)
            .map( player => 
             ({key: player.playerID, text: `${player.playerFName} ${player.playerLName}`, value: player.playerID})
        )
        :
        (teamA.batting === true ? teamA : teamB).players.filter( plyr => plyr.batStat !== 'OUT')
            .filter(player => player.playerID !== batsman1)
            .map( player => 
             ({key: player.playerID, text: `${player.playerFName} ${player.playerLName}`, value: player.playerID})
        )
        return battingPlayers;
    }

    const getCurrentBatters = () => {
        const currBatters = clubPlayers
        .filter(player => (player.playerID === batsman1 || player.playerID === batsman2))
        // .filter(player => player.playerID === batsman2)
        .map( player => 
            ({key: player.playerID, text: `${player.playerFName} ${player.playerLName}`, value: player.playerID})
        )
        //console.log(currBatters)
        return currBatters;
    }



    const getBowlingPlayers = () => {
        const bowlingPlayers = (teamA.batting === true ? teamB : teamA).players
            .map( player => 
             ({key: player.playerID, text: `${player.playerFName} ${player.playerLName}`, value: player.playerID})
        )
        return bowlingPlayers;
    }


    useEffect(() => {
        if(over.length == 6) {
            setOverList([...overList, {overNumber: currOver, bowler: bowler, over:over}]);
            setOver([]);
        }

        getScoreForBatsman();        
    }, [over])

    const handleScore = () => {
        setOver([...over, {ballNum: currBall, scoreType: scoreType, runs: runs, batsman: currBatsman}]);

        // Zero-out ball
        setRuns();
        setScoreType('');
        setCurrBatsman();

        setNotReady(true);
        setOpen(false);
        

        if(currBall === 6) {
            //setOverList({...overList, over});
            setCurrOver(currOver + 1);
            setCurrBall(1);
            //setOver([]);
        }
        else{
            setCurrBall(currBall+1);
        }
    }


    /* 
        getScoreForBatsman() => Return the current score of the batsman
        Param : 'batsman' => batsmanID
    */
    const getScoreForBatsman = () => {
        //console.log(batsman);

        // upToLastOverScore => Total score up to the Last Ended Over.
        let upToLastOverScore = 0;

        // thisOverScore => Score in this over.
        let thisOverScore = 0;

        if(overList.length > 0){
            overList.forEach((overFromList) => {
                upToLastOverScore = overFromList.over.reduce((prevOverTotal, ball) => {
                    return prevOverTotal + ball.runs
                }, upToLastOverScore)
            })            
        }

        if(over.length > 0){
            thisOverScore = over.reduce((overTotal, ball) => {
                return overTotal + ball.runs
            }, 0)
        } 

        console.log(`last Tot: ${upToLastOverScore}`)

        console.log(`this Over: ${thisOverScore}`);
    }

    return (
        <div className="over-container">
            <div className="teamPlayers-container">
                <div className="batsmen-container">
                    <div className="bat-container">                    
                        <label className="player-label">Batsman : 1</label>    
                        <Segment> 
                            { batsman1 ?
                            <Label 
                                size='huge' 
                                color='green' 
                                floating
                                onClick={() => {
                                        setIsBatStatOpen(true);
                                    }
                                }
                            >
                                Score
                            </Label>  
                            : ''}                
                            <Dropdown
                                fluid
                                button
                                clearable
                                placeholder='Select Batsman 1'                
                                options={getBattingPlayers(1)}
                                value={batsman1}
                                onChange={(e, {value}) => setBatsman1(value)}
                            />
                        </Segment> 
                    </div>                    
                    <div className="bat-container">
                        <label className="player-label">Batsman : 2</label>
                        <Segment className="over-segment">
                            { batsman2 ?
                            <Label
                                size='huge' 
                                color='green' 
                                floating
                                onClick={() => {
                                        setIsBatStatOpen(true);
                                    }
                                }
                            >
                                Score
                            </Label>
                            : ''}
                            <Dropdown
                                fluid
                                button
                                clearable
                                placeholder='Select Batsman 2'                
                                options={getBattingPlayers(2)}
                                value={batsman2}
                                onChange={(e, {value}) => setBatsman2(value)}
                            />               
                        </Segment>                        
                    </div>
                </div>
                <div className="bowler-container">
                    <label className="player-label">Bowler</label>
                    <Segment>
                        {bowler ?
                        <Label size='huge' color='green' floating>
                                Score
                        </Label>
                        : ''}
                        <Dropdown
                            fluid
                            button
                            clearable
                            placeholder='Select Bowler'                
                            options={getBowlingPlayers()}
                            value={bowler}
                            onChange={(e, {value}) => setBowler(value)}
                        />
                    </Segment>
                    <div className="over-display">
                        <Label size='huge' color="red" tag>Overs : {currOver}</Label>
                    </div>
                </div>
            </div>

            <div className="over-ball-container">
                {
                    bowler && batsman1 && batsman2 ? //See if the bowler is selected before loading the over
                        ballsOfTheOver.map(val => {
                            return <BallButton
                                        key={val}
                                        ball={val}
                                        currBall={currBall}
                                        setCurrBall={setCurrBall}
                                        setOpen={setOpen}
                                    /> 
                        })
                    :
                        ''
                }
            </div>

            <Modal
                size='tiny'
                open={false}
                closeOnDimmerClick={false}
            >
                <Modal.Header>Select Batting Team</Modal.Header>
                <Modal.Content>
                    <Segment textAlign='center'>  
                    <Dropdown 
                        options={runOptions} 
                        selection 
                        placeholder="Select Batting Team"
                    />
                    </Segment>
                </Modal.Content>

            </Modal>
                        
            <Modal
                className="over-modal"
                size="tiny"
                open={open}
                onClose={() => {
                        setOpen(false);
                        setNotReady(true)
                    }
                }
                closeOnDimmerClick={true}
            >
                <Modal.Header>Let's Record this Delivery</Modal.Header>
                <Modal.Content>
                    <Segment textAlign='center'>                        
                        <Divider horizontal>Runs</Divider>
                        <div className="score-container">
                            <Dropdown 
                                options={runOptions} 
                                selection 
                                placeholder="Select Runs"
                                onChange={(e, {value}) => {
                                    setRuns(value);
                                    setNotReady(false);
                                }}
                            />
                        </div>
                        <Divider horizontal>Score Type</Divider>
                        <div className="score-type">
                            <Dropdown 
                                options={scoreTypeOptions} 
                                selection 
                                clearable
                                placeholder="Select Score Type"
                                onChange={(e, {value}) => setScoreType(value)}
                            />
                        </div>
                        <Divider horizontal>Batsman</Divider>
                        <div className="score-typeww">
                            <Dropdown 
                                options={getCurrentBatters()} 
                                selection 
                                clearable
                                placeholder="Select Batsman"
                                onChange={(e, {value}) => setCurrBatsman(value)}
                            />
                        </div>
                        <Divider horizontal>Confirm</Divider>
                        <Button 
                            color="green"
                            attached='bottom'
                            disabled={notReady}
                            onClick={handleScore}
                        >Submit Runs</Button>
                    </Segment>
                </Modal.Content>
            </Modal>   
            <Modal
                size='mini'
                open={isBatStatOpen}
                onClose={() => {
                        setIsBatStatOpen(false)
                    }
                }
            >
                <Modal.Header>Change Batsman Status</Modal.Header>
                <Modal.Actions>
                    <Button 
                        color='black' 
                        icon 
                        floated='left'
                        onClick={() => {
                            setIsBatStatOpen(false)
                            }                        
                        }
                    >
                        <Icon name='arrow left'></Icon>
                    </Button>
                    <Button positive>
                        RETIRED
                    </Button>
                    <Button negative>
                        OUT
                    </Button>
                </Modal.Actions>
            </Modal>   
        </div>
    )
}

export default Over
