import {connect} from "react-redux";
import style from "../styles/Charts.module.css";
import React from "react";
import {Bar} from "react-chartjs-2";

function SwimmerCountHistory(props) {
    const sorted = props.statistics.swimmerCountHistory.slice().sort((a, b) => {
        const x = a.start;
        const y = b.start;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    const labels = sorted.map(interval => `${interval.start}h - ${interval.end}h`);
    const chartData = sorted.map(interval => interval.count);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Number of swimmers',
            data: chartData,
            backgroundColor: Array(24).fill('#003f5c'),
            hoverOffset: 4
        }]
    };
    const options = {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                }
            }]
        },
        title: {
            display: "Evolution swimmers count",
            text: "Evolution swimmers count"
        }
    };
    return (
        <div className={style.chart}>
            <h2>Evolution swimmers count</h2>
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    statistics: state.statistics,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SwimmerCountHistory);