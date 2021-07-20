import { Bar, Line, Pie } from 'react-chartjs-2';

const GameStats = ({overList}) => {

    const bowlerSudeeraData = {
        labels: ['1st Over','2nd Over','3rd Over','4th Over','5th Over','6th Over'],
        datasets: [
            {
                label: `Runs per Over (Sudeera Ilandarage), Econ :${(47/6).toPrecision(3)}`,
                data: [5, 7, 11, 9, 8, 7],
                backgroundColor: '#750000'
            }
        ]
    }

    const bowlerSamanData = {
        labels: ['1st Over','2nd Over','3rd Over','4th Over','5th Over','6th Over'],
        datasets: [
            {
                label: `Runs per Over (Saman Maharachchi), Econ :${(32/5).toPrecision(3)}`,
                data: [3, 4, 11, 8, 6],
                backgroundColor: '#db0000'
            }
        ]
    }

    const battingSudeeraData = {
        labels: ['1','2','3','4','5','6','7','8','9','10',
                '11','12','13','14','15','16','17','18','19','20',
                '21','22','23','24','25','26','27','28','29','30',
            ],
        fill: true,
        datasets: [
            {
                label: `Team - Punya, Score Progression (Runs per Over)`,
                data: [3,5,3,7,11,11,2,1,3,4,7,5,4,5,2,7,3,11,2,8,11,6,11,10,9,8,13,11,11,5],
                backgroundColor: '#750000'
            }
        ]
    }

    return (
        <div className="chart-container">
            <div className="bowling-stats">
                <div className="bowler-stat">
                    <Bar
                        data={bowlerSudeeraData}
                        options={{
                            title:{
                                display:true,
                                text:'Runs per Over (Sudeera Ilandarage)',
                                fontSize:25
                            }
                        }}
                    />
                </div>
                <div className="bowler-stat">
                    <Bar
                        data={bowlerSamanData}
                        options={{
                            maintainAspectRation: false
                        }}
                    />
                </div>
            </div>
            <div className="batting-stats">
                    <Line
                        data={battingSudeeraData}
                    />
            </div>
        </div>
    )
}

export default GameStats
