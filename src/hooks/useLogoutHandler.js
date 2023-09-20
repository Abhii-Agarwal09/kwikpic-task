import { useDispatch } from "react-redux";
import { VERIFY_LOGOUT_REQUEST } from "redux-store/sagas/saga-actions";

const useLogoutHandler = () => {
  const dispatch = useDispatch();

  async function logoutHandler() {
    dispatch({
      type: VERIFY_LOGOUT_REQUEST,
    });
  }

  return { logoutHandler };
};

export default useLogoutHandler;
