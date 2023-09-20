import React, { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import PageHeading from "../components/pageHeading/PageHeading";
import EmptyGroup from "./components/EmptyGroup";
import GroupView from "./components/GroupView";
import { useDispatch } from "react-redux";
import { GET_MY_GROUPS } from "../../../redux-store/sagas/saga-actions";
import { useSelector } from "react-redux";
import Spinner from "../../components/loader/Spinner";
import { setUserFirstTime } from "redux-store/slices/user";

const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState({ page: 1, limit: 20 });

  const { groups, count, initialLoader } = useSelector((state) => state.groups);
  const { firstTime } = useSelector((state) => state.user)

  const handleShow = () => {
  };

  useEffect(() => {
    dispatch({
      type: GET_MY_GROUPS,
      payload: currentPage,
    });
  }, [dispatch]);

  const hasNoGroups = groups?.length === 0 && !initialLoader;

  return (
    <Container>
      <Spinner loading={initialLoader} />
      <div className="homePage">
        <PageHeading
          title="Groups"
          link="/join"
          handleShow={handleShow}
          rightBar={true}
        />
        {hasNoGroups ? (
          <EmptyGroup />
        ) : (
          <GroupView
            setCurrentPage={setCurrentPage}
            groups={groups}
            count={count}
            currentPage={currentPage}
            thumb="../../../assets/images/login-banner.svg"
          />
        )}
      </div>
      <UserRegisteredModal show={firstTime} />

      {/*  <span onClick={handleAppModalShow}>App Modal Show</span>*/}
      {/*<DownloadAppModal*/}
      {/*    show={appModal}*/}
      {/*    handleClose={handleAppModalClose}*/}
      {/*/>*/}
    </Container>
  );
};

const UserRegisteredModal = (props) => {
  const dispatch = useDispatch()
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="selfieModal modal-accepted"
    >
      <div className="cameraClick">
        <img src="../../../assets/images/icons/user.png" alt="user" />
      </div>
          <span className="font-thick font-15 btn-accepted">Verified!</span>
        <button
          className="thick-font font-15"
          onClick={() => dispatch(setUserFirstTime(false))}
        >
          Close
        </button>
    </Modal>
  );
};

export default Home;
