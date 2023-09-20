import { takeLatest, put, call } from "redux-saga/effects";
import { AXIOS } from "../../utils/setup/axios";
import { GET_MY_GROUPS, CREATE_MY_GROUP, JOIN_MY_GROUP } from "./saga-actions";
import { setMyGroups, createMyGroup, joinMyGroup } from "../slices/group";
import { toast } from "react-toastify";

async function getMyGroups({ payload }) {
  return AXIOS.get(`/api/app/group/my-groups-v2`, {
    params: payload,
  });
}

async function createMyGroupApi(action) {
  return AXIOS.post(`api/app/group/create`, action);
}

async function joinMyGroupApi(action) {
  const { groupCode } = action;
  return AXIOS.post(`api/app/group/join`, { groupCode });
}

function* getMyGroupsGenerator(action) {
  const page = action?.payload?.page;
  try {
    const response = yield call(getMyGroups, action);
    yield put(setMyGroups({ data: response.data, page }));
  } catch (e) {
    //
  }
}

// SAGA FUCTIONS
function* createGroupGenerator(obj) {
  var formData = new FormData();
  formData.append("name", obj.formData.name);
  formData.append("icon", obj.formData.icon);
  formData.append("noOfParticipants", obj.formData.noOfParticipants);
  formData.append("participants", obj.formData.participants);
  formData.append("isPrivate", obj.formData.isPrivate);
  formData.append("canAnyoneUploadPhotos", obj.formData.canAnyoneUploadPhotos);
  formData.append(
    "newJoineShowPreviousPhotos",
    obj.formData.newJoineShowPreviousPhotos
  );
  formData.append("anyOneJoinWithLink", obj.formData.anyOneJoinWithLink);

  try {
    const response = yield call(createMyGroupApi, formData);
    toast.success(response?.data?.message);

    yield put(createMyGroup(response.data));
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
}

function* joinGroupGenerator(data) {
  try {
    const response = yield call(joinMyGroupApi, data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      toast.success(response?.data?.message);
    }
    yield put(joinMyGroup(response.data));
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
}

export function* groupsSaga() {
  yield takeLatest(GET_MY_GROUPS, getMyGroupsGenerator);
  yield takeLatest(CREATE_MY_GROUP, createGroupGenerator);
  yield takeLatest(JOIN_MY_GROUP, joinGroupGenerator);
}
