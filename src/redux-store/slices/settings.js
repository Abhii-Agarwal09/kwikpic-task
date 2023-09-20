import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generalSettings: {},
  privacySettings: {},
  participantsSettings: {},
  leaveParticipantSettings: {},
  foldersSettings: {},
  designSettings: {},
  downloadSettings: {},
  clientFavourites: {},
  GroupParticipantsSettings: {},
  settingLoader: false,
  saveLoader: false,
  businessBranding: {},
  leaveGroupStatus: {},
  userProfileDetails: {},
  updatePhoneOrEmailSendOTPResponse: {},
  updatePhoneOrEmailVerifyOTPResponse: {},
  renameFolderResponse: {},
  groupDetails: {},
  userAnalytics: {},
  groupSettingLoader: false,
  brandingData: {},
  // designSettingsGroupId: "",
};

export const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setGroupSettingsAndOtherSettings: (state, action) => {
      const { data, status } = action?.payload || {};
      if (status === 200) {
        const {
          name,
          _id,
          participants,
          canAnyoneUploadPhotos,
          isPrivate,
          // favoritePics,
          newJoineShowPreviousPhotos,
          icon,
          isAdmin,
          uploadParticipants,
          iconFocalPoint,
        } = data?.group || {};

        const brandingData = data?.brandingData || {};

        const generalSettings = {
          groupID: _id,
          groupName: name,
          icon,
          iconFocalPoint,
        };

        const general_setting_loader = true;

        const participantsSettings = {
          groupID: _id,
          participants,
        };
        const leaveParticipantSettings = {
          groupID: _id,
          isAdmin,
        };

        const privacySettings = {
          groupID: _id,
          canAnyoneUploadPhotos,
          isPrivate,
          uploadParticipants,
          newJoineShowPreviousPhotos,
        };

        return {
          ...state,
          generalSettings,
          general_setting_loader,
          participantsSettings,
          privacySettings,
          settingLoader: false,
          groupSettingLoader: false,
          leaveParticipantSettings,
          groupDetails: data?.group || {},
          brandingData,
        };
      }
    },

    setFoldersSettings: (state, action) => {
      return {
        ...state,
        foldersSettings: action.payload,
      };
    },

    setGroupDesignaAndSettings: (state, action) => {
      const { data, status } = action?.payload || {};

      if (status === 200) {
        const { design, download, groupId } = data;

        return {
          ...state,
          designSettings: design,
          groupId,
          downloadSettings: download,
          settingLoader: false,
        };
      }
    },

    setGroupParticipantsSettings: (state, action) => {
      const { participants } = state?.participantsSettings || {};
      const { data: { status } = {}, id } = action?.payload || {};
      const newParticipants = participants.map((participant) => {
        if (participant.participantId === id) {
          return { ...participant, isAdmin: !participant.isAdmin };
        }
        return participant;
      });

      if (status === 200 || status === 201) {
        return {
          ...state,
          saveLoader: false,
          participantsSettings: {
            ...state.participantsSettings,
            participants: newParticipants,
          },
        };
      }
    },

    handleGroupGeneralSettingsChange: (state, action) => {
      return {
        ...state,
        saveLoader: false,
        generalSettings: {
          ...state.generalSettings,
          icon: action.payload.data.group.icon,
          iconFocalPoint: action.payload.data.group.iconFocalPoint,
        },
      };
    },
    setGroupPrivacySettings: (state) => {
      return {
        ...state,
        saveLoader: false,
      };
    },
    setPostGroupDesignaAndSettings(state) {
      return {
        ...state,
        saveLoader: false,
      };
    },

    setBusinessBranding: (state, action) => {
      const { data, status } = action?.payload || {};
      if (status === 200) {
        const {
          business_name,
          business_email,
          business_email_d,
          business_phone,
          business_phone_d,
          fb_link,
          fb_link_d,
          insta_link,
          insta_link_d,
          logo,
          user,
          website,
          website_d,
        } = data || {};

        const businessBranding = {
          'business_name': business_name || " ",
          'business_email': business_email || " ",
          'business_phone': business_phone || " ",
          business_phone_d,
          business_email_d,
          'website': website || " ",
          website_d,
          'insta_link': insta_link || " ",
          insta_link_d,
          'fb_link': fb_link || " ",
          fb_link_d,
          user,
          logo,
        };

        return {
          ...state,
          saveLoader: false,
          settingLoader: false,
          businessBranding,
        };
      }
    },

    setPostBusinessBranding: (state) => {
      return {
        ...state,
        saveLoader: false,
      };
    },

    setPutBusinessLogo: (state) => {
      return {
        ...state,
        saveLoader: false,
      };
    },

    setSettingLoader(state, action) {
      return {
        ...state,
        settingLoader: action.payload,
      };
    },

    setSaveLoader(state, action) {
      return {
        ...state,
        saveLoader: action.payload,
      };
    },

    clientFavourites: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        clientFavourites: {
          groupId: payload.groupID,
          favourites: payload.data.data.results,
        },
      };
    },

    setLeaveGroupStatus(state, action) {
      return {
        ...state,
        saveLoader: false,
        leaveGroupStatus: action.payload,
      };
    },
    setUserProfileData: (state, action) => {
      const { data: { user } = {}, status } = action?.payload || {};
      if (status === 200) {
      localStorage.setItem("user", JSON.stringify(user));
        return {
          ...state,
          userProfileDetails: user,
          settingLoader: false,
        };
      } else {
        return {
          ...state,
          settingLoader: false,
        };
      }
    },

    setSendOtpToUpdatePhoneOrEmail: (state, action) => {
      const { message, status } = action?.payload || {};

      if (status === 201 || status === 200) {
        return {
          ...state,
          updatePhoneOrEmailSendOTPResponse: { status, message },
          settingLoader: false,
        };
      }
    },

    clearUpdatePhoneOrEmailSendOTPResponse: (state) => {
      return {
        ...state,
        updatePhoneOrEmailSendOTPResponse: {}
      }
    },

    setVerifyOtpToUpdatePhoneOrEmail: (state, action) => {
      const { status } = action?.payload || {};
      if (status === 200) {
        return {
          ...state,
          updatePhoneOrEmailVerifyOTPResponse: { status },
          settingLoader: false,
        };
      }
      return {
        ...state,
        settingLoader: false,
      };
    },

    setDeleteGroupIcon: (state) => {
      return {
        ...state,
        generalSettings: { ...state.generalSettings, icon: null },
      };
    },
    removeParticipantFromGroup: (state, action) => {
      const { participantId, groupId, status } = action?.payload || {};
      const updatedParticipants =
        state?.participantsSettings?.participants.filter(
          (participant) => participant.participantId !== participantId
        );

      if (status === 200) {
        return {
          ...state,
          saveLoader: false,
          participantsSettings: {
            groupId,
            participants: updatedParticipants,
          },
        };
      }
      return {
        ...state,
        saveLoader: false,
      };
    },
    setUserAnalytics: (state, action) => {
      const { data, status } = action?.payload || {};

      if (status === 200) {
        return {
          ...state,
          userAnalytics: data || {},
          settingLoader: false,
        };
      }
      return {
        ...state,
        settingLoader: false,
      };
    },
    setGroupSettingsLoader: (state, action) => {
      return {
        ...state,
        groupSettingLoader: action.payload,
      };
    },
  },
});

export const {
  setGroupSettingsAndOtherSettings,
  setFoldersSettings,
  setGroupDesignaAndSettings,
  setGroupParticipantsSettings,
  handleGroupGeneralSettingsChange,
  setGroupPrivacySettings,
  setDesignaGroupSettings,
  setSaveLoader,
  setSettingLoader,
  setPostGroupDesignaAndSettings,
  setBusinessBranding,
  setPostBusinessBranding,
  setPutBusinessLogo,
  setLeaveGroupStatus,
  setUserProfileData,
  setSendOtpToUpdatePhoneOrEmail,
  clearUpdatePhoneOrEmailSendOTPResponse,
  setVerifyOtpToUpdatePhoneOrEmail,
  setDeleteGroupIcon,
  removeParticipantFromGroup,
  clientFavourites,
  setUserAnalytics,
  setGroupSettingsLoader,
} = settings.actions;

export default settings.reducer;
