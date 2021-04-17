import {connect} from "react-redux";
import {Pie} from "react-chartjs-2";
import React from "react";
import style from "../styles/Charts.module.css";

function AgeDistribution(props) {
    const sorted = props.statistics.ageDistribution.slice().sort((a, b) => {
        const x = a.start;
        const y = b.start;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    const labels = sorted.map(interval => `${interval.start} - ${interval.end}`);
    const chartData = sorted.map(interval => interval.count);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Age distribution',
            data: chartData,
            backgroundColor: [
                '#003f5c',
                '#2f4b7c',
                '#665191',
                '#a05195',
                '#d45087',
                '#f95d6a',
                '#ff7c43',
                '#ffa600',
            ],
            hoverOffset: 4
        }]
    };

    return (
        <div className={style.chart}>
            <h2>Current age distribution</h2>
            <div>
                <Pie
                    data={data}
                />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    statistics: state.statistics,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AgeDistribution);