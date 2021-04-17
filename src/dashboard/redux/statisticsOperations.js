import {createAsyncThunk} from "@reduxjs/toolkit";
import StatisticsRepository from "../data/StatisticsRepository";
import {
    setCurrentSwimmersCount,
    setAgeDistribution,
    setCurrentPaidBySubscription,
    setCurrentPaidByTicket,
    setGenderDistribution, setSwimmerCountHistory,
} from "./statisticsSlice";

const statisticsRepository = new StatisticsRepository();

const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async (arg, thunkApi) => {
        // const state = thunkApi.getState();
        const statistics = await statisticsRepository.fetchStatistics();
        if (statistics != null) {
            return dispatchNewStatistics(thunkApi, statistics);
        } else {
            return thunkApi.rejectWithValue('error fetching statistics');
        }
    }
);

const startSseStatisticsStream = createAsyncThunk(
    'statistics/startSseStatisticsStream',
    async (arg, thunkApi) => {
        await statisticsRepository.startSseStatisticsStream((message) => {
            const statistics = JSON.parse(message.data);
            dispatchNewStatistics(thunkApi, statistics);
        });
    }
);

const dispatchNewStatistics = (thunkApi, statistics) => {
    if (statistics != null) {
        thunkApi.dispatch(setCurrentSwimmersCount(statistics.currentSwimmersCount));
        thunkApi.dispatch(setCurrentPaidBySubscription(statistics.currentPaidBySubscription));
        thunkApi.dispatch(setCurrentPaidByTicket(statistics.currentPaidByTicket));

        const ageDistribution = statistics.ageDistribution.map(dto => mapAgeDistributionDtoToViewModel(dto));
        thunkApi.dispatch(setAgeDistribution(ageDistribution));

        const genderDistribution = statistics.genderDistribution.map(dto => mapGenderDistributionDtoToViewModel(dto));
        thunkApi.dispatch(setGenderDistribution(genderDistribution));

        const swimmerCountHistory = statistics.swimmerCountHistory.map(dto => mapSwimmerCountHistoryDtoToViewModel(dto));
        thunkApi.dispatch(setSwimmerCountHistory(swimmerCountHistory));

        return {'success': true};
    }
}

const mapAgeDistributionDtoToViewModel = (ageDistributionDto) => {
    return {
        start: ageDistributionDto.start,
        end: ageDistributionDto.end,
        count: ageDistributionDto.count,
    };
}

const mapGenderDistributionDtoToViewModel = (genderDistributionDto) => {
    return {
        gender: genderDistributionDto.gender,
        count: genderDistributionDto.count,
    };
}

const mapSwimmerCountHistoryDtoToViewModel = (swimmerCountHistoryDto) => {
    return {
        start: swimmerCountHistoryDto.start,
        end: swimmerCountHistoryDto.end,
        count: swimmerCountHistoryDto.count,
    };
}

export {
    fetchStatistics,
    startSseStatisticsStream,
}