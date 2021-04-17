import React from 'react'
import {connect} from "react-redux";
import {Pie} from "react-chartjs-2";
import style from "../styles/Charts.module.css";


function GenderDistribution(props) {
    const genderM = props.statistics.genderDistribution.filter(g => g.gender === 'M')[0];
    const genderF = props.statistics.genderDistribution.filter(g => g.gender === 'F')[0];
    const data = {
        labels: [
            genderM.gender,
            genderF.gender,
        ],
        datasets: [{
            label: 'Distribution gender',
            data: [genderM.count, genderF.count],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
        }]
    };

    return (
        <div className={style.chart}>
            <h2>Current gender distribution</h2>
            <Pie
                data={data}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    statistics: state.statistics,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GenderDistribution);