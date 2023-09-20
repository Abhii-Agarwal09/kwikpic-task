/* eslint-disable no-console */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeEvent: {},
  activeEventId: "",
  aciveEventName: "",
  activeEventDate: "",
};

const analytics = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setActiveEvent: (state, action) => {
      const groupData = action?.payload?.res?.data?.data;
      return {
        ...state,
        activeEvent: groupData,
      };
    },
    setActiveEventId: (state, action) => {
      return {
        ...state,
        activeEventId: action.payload.activeEventId,
        activeEventName: action.payload.activeEventName,
        activeEventDate: action.payload.activeEventDate,
      };
    },
  },
});

export const { setActiveEvent, setActiveEventId } = analytics.actions;

export default analytics.reducer;
