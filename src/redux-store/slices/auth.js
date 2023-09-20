import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singupType: "", // login || register
  user: {},
  registerResponse: {},
  verifyOTYResponse: {},
  token: "",
  registerPhotographerResponse: {},
  loading: false,
  uploadAvatarResponse: {},
  goBackType: null
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleUserRegisteration: (state, action) => {
      const {
        data: { user },
        status,
        message,
      } = action?.payload || {};

      if (status === 200) {
        return {
          ...state,
          user,
          registerResponse: {
            status,
            message,
          },
          loading: false,
        };
      }
    },
    handleVerifyOTP: (state, action) => {
      const {
        status,
        message,
        data: { user, token },
      } = action?.payload || {};

      if (status === 200 || status === 201) {
        return {
          ...state,
          user,
          token,
          verifyOTPResponse: {
            status,
            message,
          },
          loading: false,
        };
      }
    },
    handleRegisterPhotographerProfile: (state, action) => {
      const { status, message } = action?.payload || {};

      if (status === 200 || status === 201) {
        return {
          ...state,
          registerPhotographerResponse: {
            status,
            message,
          },
          loading: false,
        };
      }
    },
    setSignupType: (state, action) => {
      return {
        ...state,
        singupType: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action?.payload,
      };
    },
    handleUploadAvatarResponse: (state, action) => {
      const { status, message } = action?.payload || {};

      if (status === 200 || status === 201) {
        return {
          ...state,
          loading: false,
          uploadAvatarResponse: {
            status,
            message,
          },
        };
      }
      return {
        ...state,
        loading: false,
        uploadAvatarResponse: {
          status,
          message,
        },
      };
    },
    clearUploadAvatarResponse: (state) => {
      return {
        ...state,
        uploadAvatarResponse: {},
      };
    },
    setGoBackType: (state, action) => {
      return {
        ...state,
        goBackType: action.payload
      }
    },
    clearGoBackType: (state) => {
      return {
        ...state,
        goBackType: null
      }
    },
    clearUser: (state) => {
      return {
        ...state,
        user: {},
        token: ""
      }
    },
    clearStatusAndOTPResponse: (state) => {
      return {
        ...state,
        registerResponse: {},
        verifyOTPResponse: {}
      }
    },
  },
});

export const {
  handleUserRegisteration,
  handleVerifyOTP,
  setSignupType,
  handleRegisterPhotographerProfile,
  setLoading,
  setUser,
  handleUploadAvatarResponse,
  clearUploadAvatarResponse,
  setGoBackType,
  clearGoBackType,
  clearUser,
  clearStatusAndOTPResponse,
} = auth.actions;

export default auth.reducer;
