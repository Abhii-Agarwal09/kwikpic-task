import { takeLatest, put, call } from "redux-saga/effects";
import { AXIOS } from "../../utils/setup/axios";
import { toast } from "react-toastify";

import {
  handleUserRegisteration,
  handleVerifyOTP,
  handleRegisterPhotographerProfile,
  setLoading,
  handleUploadAvatarResponse,
} from "../slices/auth";
import {
  REGISTER_REQUEST,
  VERIFY_OTP_REQUEST,
  REGISTER_PHOTOGRAPHER_PROFILE,
  // SET_USER_PROFILE,
  VERIFY_LOGOUT_REQUEST,
  UPLOAD_AVATAR,
} from "./saga-actions";

async function registerRequest(action) {
  return AXIOS.post("api/app/auth/register", action?.payload);
}
async function verifyLogoutRequest() {
  return AXIOS.post("api/app/auth/logout");
}

function* registerRequestGenerator(action) {
  try {
    const response = yield call(registerRequest, action);
    yield put(handleUserRegisteration(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.error?.[0] || e?.response?.data?.message);
    yield put(setLoading(false));
  }
}

async function verifyOTPRequest(action) {
  return AXIOS.post("api/app/auth/verify-otp-login", {
    ...action?.payload,
  });
}

async function registerPhotographerProfile(action) {
  const { token, ...payload } = action.payload;
  return AXIOS.post("api/app/user/set-photographer-profile", payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

function* verifyOTPRequestGenerator(action) {
  try {
    const response = yield call(verifyOTPRequest, action);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      toast.success(response?.data?.message);
    }
    yield put(handleVerifyOTP(response?.data));
  } catch (e) {
    yield put(setLoading(false));
    toast.error(e?.response?.data?.message);
  }
}

function* registerPhotographerProfileGenerator(action) {
  try {
    const response = yield call(registerPhotographerProfile, action);
    yield put(handleRegisterPhotographerProfile(response?.data));
  } catch (e) {
    yield put(setLoading(false));
    toast.error(e?.response?.data?.message);
  }
}

function* verifyLogoutRequestGenerator() {
  try {
    const response = yield call(verifyLogoutRequest);
    if (response?.status === 200) {
      localStorage.clear();
      window.location.replace("/auth/login");
    }
    yield put(setLoading(false));
  } catch (e) {
    toast.error("Logout Failed");
    yield put(setLoading(false));
  }
}

async function uploadAvatar(action) {
  const { avatar, token } = action?.payload || {};

  const formData = new FormData();
  formData.append("avatar", avatar);

  return AXIOS.put("api/app/user/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
}

function* uploadAvatarGenerator(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(uploadAvatar, action);
    if (response?.status === 200 || response?.status === 201) {
      toast.success(response?.data?.message || "Avatar Uploaded Successfully");
    }
    yield put(handleUploadAvatarResponse(response?.data));
  } catch (e) {
    yield put(handleUploadAvatarResponse(e?.response?.data));
    const errorMessage = e?.response?.data?.reason;
    toast.error(errorMessage);
    yield put(setLoading(false));
  }
}

export function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, registerRequestGenerator);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOTPRequestGenerator);
  yield takeLatest(VERIFY_LOGOUT_REQUEST, verifyLogoutRequestGenerator);
  yield takeLatest(
    REGISTER_PHOTOGRAPHER_PROFILE,
    registerPhotographerProfileGenerator
  );
  yield takeLatest(UPLOAD_AVATAR, uploadAvatarGenerator);
}
