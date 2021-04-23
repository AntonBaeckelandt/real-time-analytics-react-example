import {connect} from "react-redux";
import styles from '../styles/DashboardScreen.module.css';
import {fetchStatistics, startSseStatisticsStream} from "../redux/statisticsOperations";
import {useEffect, useState} from "react";
import AgeDistribution from "./AgeDistribution";
import GenderDistribution from "./GenderDistribution";
import TicketSubscriptionDistribution from "./TicketSubscriptionDistribution";
import {unwrapResult} from "@reduxjs/toolkit";
import SwimmerCountHistory from "./SwimmerCountHistory";

function DashboardScreen(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const loadStatistics = () => {
        setIsLoading(true);
        props.fetchStatistics()
            .then(unwrapResult)
            .then(result => {
                setIsError(!result.success);
                setIsLoading(false);
            })
            .catch(error => {
                console.log('Error loading statistics', error);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const startStreamingStatistics = () => {
        props.startSseStatisticsStream()
            .then(unwrapResult)
            .then(result => {
            })
            .catch(error => {
                console.log('Error starting SSE stream', error);
                setIsError(true);
            });
    }

    useEffect(loadStatistics, []);
    useEffect(startStreamingStatistics, []);

    const render = () => {
        if (isLoading) {
            return (<div>Loading...</div>);
        } else if (isError) {
            return (<div>Error loading statistics!</div>);
        } else {
            return (
                <main>
                    <h1>Real time analytics example</h1>
                    <div className={styles.grid}>
                        <AgeDistribution></AgeDistribution>
                        <SwimmerCountHistory></SwimmerCountHistory>
                        <GenderDistribution></GenderDistribution>
                        <TicketSubscriptionDistribution></TicketSubscriptionDistribution>
                    </div>
                </main>
            );
        }
    };

    return render();
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => ({
    fetchStatistics: () => dispatch(fetchStatistics()),
    startSseStatisticsStream: () => dispatch(startSseStatisticsStream()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);