import {connect} from "react-redux";
import {Pie} from "react-chartjs-2";
import React from "react";
import style from "../styles/Charts.module.css";

function TicketSubscriptionDistribution(props) {
    const tickets = props.statistics.currentPaidByTicket;
    const subscriptions = props.statistics.currentPaidBySubscription;
    const data = {
        labels: [
            "Tickets",
            "Subscriptions",
        ],
        datasets: [{
            label: 'Distribution tickets/subscriptions',
            data: [tickets, subscriptions],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        }]
    };
    return (
        <div className={style.chart}>
            <h2>Current tickets/subscriptions distribution</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(TicketSubscriptionDistribution);