import {Config} from '../../Config'


export default class StatisticsRepository {

    fetchStatistics = async () => {
        return fetch(`${Config.serverUrl}/statistics`)
            .then(response => response.json())
            .then(json => {
                return json;
            })
            .catch((error) => {
                return null;
            })
    }

    startSseStatisticsStream = async (onMessage) => {
        const eventSource = new EventSource(`${Config.serverUrl}/statistics-sse`);
        eventSource.addEventListener("new-statistics", onMessage);
        eventSource.addEventListener("heartbeat", (message) => console.log("Received heart beat"));
    }

}