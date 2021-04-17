import { configureStore } from '@reduxjs/toolkit';
import statisticsReducer from "../dashboard/redux/statisticsSlice";

export default configureStore({
  reducer: {
    statistics: statisticsReducer,
  },
});
