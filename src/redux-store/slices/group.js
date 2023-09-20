import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  groupLayout: "grid",
  groupResponse: {},
  joinGroupResponse: {},
  initialLoader: true,
};

export const groups = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setMyGroups: (state, action) => {
      const { data, status } = action.payload.data || {};
      if (status === 200) {
        const { myGroups, count } = data;
        if (action.payload.page === 1) {
          return { ...state, groups: myGroups, count, initialLoader: false };
        } else {
          return {
            ...state,
            groups: [...state.groups, ...myGroups],
            count,
            initialLoader: false,
          };
        }
      }
    },
    createMyGroup: (state, action) => {
      const { data, status, message } = action?.payload || {};
      if (status === 200 || status === 201) {
        return {
          ...state,
          groups: [data, ...state.groups],
          groupResponse: {
            status,
            message,
          },
        };
      }
    },
    joinMyGroup: (state, action) => {
      const { status, message, data } = action?.payload || {};
      if (status === 200) {
        return {
          ...state,
          joinGroupResponse: {
            status,
            message,
            groupId: data?.group?._id,
          },
        };
      }
    },
    clearJoinGroupStatus: (state) => {
      return {
        ...state,
        joinGroupResponse: {
          groupId: state?.joinGroupResponse?.groupId,
        },
      };
    },
    setInitialLoader: (state, action) => {
      return { ...state, initialLoader: action.payload };
    },
    setGroupLayout: (state, action) => {
      return {
        ...state,
        groupLayout: action.payload,
      };
    },
  },
});

export const {
  setMyGroups,
  createMyGroup,
  joinMyGroup,
  setInitialLoader,
  setGroupLayout,
  clearJoinGroupStatus,
} = groups.actions;

export default groups.reducer;
