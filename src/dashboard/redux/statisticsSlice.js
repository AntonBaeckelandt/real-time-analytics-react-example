import {createSlice} from '@reduxjs/toolkit';

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        'currentSwimmersCount': null,
        'currentPaidByTicket': null,
        'currentPaidBySubscription': null,
        'ageDistribution': [],
        'genderDistribution': [],
        'swimmerCountHistory': [],
    },
    reducers: {
        setCurrentSwimmersCount: (state, action) => {
            state.currentSwimmersCount = action.payload;
        },
        setCurrentPaidByTicket: (state, action) => {
            state.currentPaidByTicket = action.payload;
        },
        setCurrentPaidBySubscription: (state, action) => {
            state.currentPaidBySubscription = action.payload;
        },
        setAgeDistribution: (state, action) => {
            state.ageDistribution = action.payload;
        },
        setGenderDistribution: (state, action) => {
            state.genderDistribution = action.payload;
        },
        setSwimmerCountHistory: (state, action) => {
            state.swimmerCountHistory = action.payload;
        },
    },
});

export const {
    setCurrentSwimmersCount,
    setCurrentPaidByTicket,
    setCurrentPaidBySubscription,
    setAgeDistribution,
    setGenderDistribution,
    setSwimmerCountHistory,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;