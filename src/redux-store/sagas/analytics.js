/* eslint-disable no-console */
import { takeLatest, put, call } from "redux-saga/effects";
import { AXIOS } from "../../utils/setup/axios";
import { GET_SINGLE_GROUP, SET_ACTIVE_GROUP } from "./saga-actions";
import { setActiveEvent, setActiveEventId } from "redux-store/slices/analytics";
import { toast } from "react-toastify";

async function getGroupAnalytics({ payload }) {
  return AXIOS.get(`/api/app/analytics/groupAnalytics/${payload}`);
}

function* getSingleGroupAnalytics(action) {
  try {
    const res = yield call(getGroupAnalytics, {
      payload: action.payload, // Use the payload from the action
    });
    yield put(setActiveEvent({ res }));
  } catch (error) {
    console.error("Error fetching single group analytics:", error);
    toast.error(
      error.response?.data?.message || "There was an error fetching analytics"
    );
    // Handle the error, e.g., dispatch an action to set an error state.
  }
}

function* setGroupId(action) {
  yield put(
    setActiveEventId({
      activeEventId: action.payload.groupId,
      activeEventName: action.payload.groupName,
      activeEventDate: action.payload.groupDate,
    })
  );
}

export function* analyticsSaga() {
  yield takeLatest(GET_SINGLE_GROUP, getSingleGroupAnalytics);
  yield takeLatest(SET_ACTIVE_GROUP, setGroupId);
}
