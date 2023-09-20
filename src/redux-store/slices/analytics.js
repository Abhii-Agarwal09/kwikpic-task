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
      console.log("State: ", state);
      console.log("Action: ", action);
      const groupData = action?.payload?.res?.data?.data;
      console.log("GroupData: ", groupData);
      return {
        ...state,
        activeEvent: groupData,
      };
    },
    setActiveEventId: (state, action) => {
      console.log("active event id action: ", action);
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
