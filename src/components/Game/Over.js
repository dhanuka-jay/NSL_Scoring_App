
import { useState, useEffect } from "react";
import { Button, Dropdown, Modal, Header, Segment, Divider, Label, Icon } from "semantic-ui-react";
import BallButton from "./BallButton";

const Over = ({teamA, teamB, overList, clubPlayers, setOverList, setPlayerOut}) => {
    const [open, setOpen] = useState(false);
    const [isBatStatOpen, setIsBatStatOpen] = useState(false);
    const [outConfirm, setOutConfirm] = useState(false);
    const [scoreType, setScoreType] = useState('');
    const [runs, setRuns] = useState();
    const [over, setOver] = useState([]);
    const [bowler, setBowler] = useState('');
    const [batsman1, setBatsman1] = useState('');
    const [batsman2, setBatsman2] = useState('');
    const [notReady, setNotReady] = useState(true);
    const [currOver, setCurrOver] = useState(0);
    const [currBall, setCurrBall] = useState(1);
    const [currBatsman, setCurrBatsman] = useState('');
    const [nextBatsman, setNextBatsman] = useState('');

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
        if(!currBatsman && !nextBatsman){
            setCurrBatsman(batsman1)
        }
        if(currBatsman && !nextBatsman){
            setNextBatsman(batsman2)
        }
        if(!currBatsman && (batsman2 === nextBatsman)){
            setCurrBatsman(batsman1)
        }
        if(!currBatsman && (batsman1 === nextBatsman)){
            setCurrBatsman(batsman2)
        }
    },[batsman1, batsman2])


    // useEffect(() => {
    //     if(runs >= 0){
    //         console.log('hh')
    //         getScoreForBatsman();  
    //         setCurrentBattingPlayer(); 
    //     }
    // }, [runs, scoreType])


    useEffect(() => {
        if(over.length == 6) {
            setOverList([...overList, {overNumber: currOver, bowler: bowler, over:over}]);
            setOver([]);

            // Change the Current Batsman after the last ball of the over.
            setCurrBatsman(nextBatsman);    
            setNextBatsman(currBatsman);
            setBowler('');
        }            
    }, [over])

    const handleScore = () => {
        setOver([...over, {ballNum: currBall, scoreType: scoreType, runs: runs, batsman: currBatsman}]);
        setCurrentBattingPlayer();

        // Zero-out ball
        setRuns();
        setScoreType('');
        //setCurrBatsman();

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
        Param : 'whoIsTheBatsman' => batsmanID
    */
    const getScoreForBatsman = (whoIsTheBatsman) => {
        // upToLastOverScore => Total score up to the Last Ended Over.
        let upToLastOverScore = 0;

        // thisOverScore => Score in this over.
        let thisOverScore = 0;

        if(overList.length > 0){
            overList.forEach((overFromList) => {
                upToLastOverScore = overFromList.over
                    .filter(ball => {
                        return ball.batsman === whoIsTheBatsman
                    })
                    .reduce((prevOverTotal, ball) => {
                    return prevOverTotal + ball.runs
                }, upToLastOverScore)
            })            
        }

        if(over.length > 0){
            thisOverScore = over
            .filter(ball => {
                return ball.batsman === whoIsTheBatsman
            })
            .reduce((overTotal, ball) => {
                return overTotal + ball.runs
            }, 0)
        } 

        return upToLastOverScore + thisOverScore;
    }


    /* 
        getBowlerDetails() => Return the current score of the batsman
        Param : 'whoIsTheBowler' => bowlerID
    */
    const getBowlerDetails = (whoIsTheBowler) => {
        //console.log(whoIsTheBowler)
        let overCount = 0;
        overList.forEach(overFromList => overFromList.bowler === whoIsTheBowler ? overCount = overCount + 1 : overCount)

        return overCount;
    }


/*
    f(): currentBattingPlayerSelect() => To automaticatlly decides which batsman(out of batsman1 and batsman2) is batting.
    pi: run => runs scored in this ball
        extra? => wheather it's an extra run
    pr: currentBatsman at the crease
*/
    const setCurrentBattingPlayer = () => {
        switch(runs) {
            case 1:
                setCurrBatsman(nextBatsman)
                setNextBatsman(currBatsman)
                break;
            case 3:
                setCurrBatsman(nextBatsman)
                setNextBatsman(currBatsman)
                break;
            case 5:
                setCurrBatsman(nextBatsman)
                setNextBatsman(currBatsman) 
                break;
            case 7:
                setCurrBatsman(nextBatsman)
                setNextBatsman(currBatsman)
                break;      
        }
    }


/*
    f(): getPlayerDetails() => To get Player Name.
    p: playerID
    r: currentBatsman's name (first & last)
*/
    const getPlayerDetails = (playerID) => {
        const reqPlayer = clubPlayers.find( p =>  playerID === p.playerID)
        //console.log(reqPlayer)
        return `${reqPlayer.playerFName} ${reqPlayer.playerLName}`;
    }


    const loadPreviousDelivery = (deliveryOfTheOver) => {
        console.log(deliveryOfTheOver)

        over.forEach(ball => {
            if(ball.ballNum === deliveryOfTheOver){
                setRuns(ball.runs);
                setScoreType(ball.scoreType);
            }
        })
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
                                {`${getScoreForBatsman(batsman1)}`}
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
                                {`${getScoreForBatsman(batsman2)}`}
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
                                {`${getBowlerDetails(bowler)}`}
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
                                        loadPreviousDelivery={loadPreviousDelivery}
                                        setCurrBall={setCurrBall}
                                        setOpen={setOpen}
                                    /> 
                        })
                    :
                        ''
                }
            </div>            

{/* 
    Modal => Score Recording Modal
 */}

            <Modal
                className="over-modal"
                size="tiny"
                open={open}
                onClose={() => {
                        setRuns();
                        setScoreType('');
                        setOpen(false);
                        setNotReady(true);
                    }
                }
                closeOnDimmerClick={true}
            >
                <Modal.Header>
                    <div className="modal-header">
                        <p>Let's Record this Delivery</p>
                        <Button 
                            size='big' 
                            negative 
                            icon 
                            labelPosition='right'
                            onClick={() => {                                
                                setScoreType('OUT');
                                setOutConfirm(true)
                            }}
                        >
                            <Icon name='hand pointer outline'/>
                            OUT
                        </Button>  
                    </div> 
                </Modal.Header>
                <Modal.Content>
                    <Segment textAlign='center'>                                             
                        <Divider horizontal>Runs</Divider>
                        <div className="score-container">
                            <Dropdown 
                                options={runOptions} 
                                selection 
                                placeholder="Select Runs"
                                value={runs}
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
                                value={scoreType}
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
                                value={currBatsman}
                                onChange={(e, {value}) => {
                                    setNextBatsman(currBatsman)
                                    setCurrBatsman(value)
                                
                                }}
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

{/* 
    Modal => Out Control Modal
 */}

            <Modal
                basic
                onClose={() => {
                    setOutConfirm(false)
                    setScoreType('');
                }}
                onOpen={() => {
                    setOutConfirm(true);
                }}
                open={outConfirm}
                size='small'
                >
                <Header icon>
                    <Icon name='hand pointer outline' />
                    <h1>OUT, Please Confirm !</h1>
                    <h3>Is {currBatsman ? getPlayerDetails(currBatsman) : ''} out ?</h3>
                </Header>
                <Modal.Actions>
                    <Button 
                        basic 
                        color='green' 
                        inverted 
                        onClick={() => {
                            setOutConfirm(false);
                            setScoreType('');
                        }}>
                    <Icon name='remove' /> No
                    </Button>
                    <Button 
                        color='red' 
                        inverted 
                        onClick={() => {
                            handleScore();
                            setOutConfirm(false);
                            setPlayerOut(currBatsman);
                            setOpen(false);
                            setCurrBatsman('');
                            currBatsman === batsman1 ? setBatsman1('') : setBatsman2('');                            
                        }}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
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
