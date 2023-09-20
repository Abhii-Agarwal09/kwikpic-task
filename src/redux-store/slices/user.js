import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: {},
    errors: {},
    firstTime: false,
  },
  reducers: {
    setUserFirstTime: (state, action) => {
      return {
        ...state,
        firstTime: action.payload
      }
    },
    setUser: (state, action) => {
      const { data, status } = action.payload;
      if (status === 200) {
        localStorage.setItem("token", `Bearer ${data?.token}`);
        localStorage.setItem("user", JSON.stringify(data?.user));

        return {
          ...state,
          user: data?.user,
        };
      } else if (status === 400) {
        return {
          ...state,
          user: {},
          errors: data,
        };
      }
    },
    updateUser(state, action) {
      if (action?.payload?._id) {
        localStorage.setItem("user", JSON.stringify(action?.payload));
      }
      return {
        ...state,
        user: action?.payload || {},
      };
    },
  },
});

export const { setUserFirstTime, setUser, updateUser } = user.actions;

export default user.reducer;
