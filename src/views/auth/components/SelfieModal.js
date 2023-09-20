import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUploadAvatarResponse } from "redux-store/slices/auth";
import { setUserFirstTime } from "redux-store/slices/user";
import cx from "classnames";

const SelfieModal = ({ onSubmit, setImgSrc }) => {
  const {
    uploadAvatarResponse: { status },
    loading,
    user,
    token,
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 200 || status === 201) {
      localStorage.setItem("token", `Bearer ${token}`);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUserFirstTime(true));
      navigate("/", {
        replace: true,
      });
    } else if (status !== 200 && status !== 201 && status) {
      setShowModal(true);
    }
  }, [status]);

  const handleRetake = () => {
    setShowModal(false)
    setImgSrc(null);
    dispatch(clearUploadAvatarResponse());
  }

  return (
    <>
      <button onClick={() => onSubmit()} className="secondarySmallButton ms-3 font-thick font-5">
        Submit
      </button>

      <MyVerticallyCenteredModal show={loading || showModal} setImgSrc={setImgSrc} showModal={showModal} handleretake={handleRetake} />
    </>
  );
};

const MyVerticallyCenteredModal = (props) => {
  const modalClass = cx({"selfieModal": true, "modal-rejected": props.showModal})
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={modalClass}
    >
      <div className="cameraClick">
        <img src="../../../assets/images/icons/user.png" alt="user" />
      </div>
      {
        props.showModal ? 
          <span className="font-thick font-15 btn-rejected">Rejected</span>
        :
          <span className="font-thick font-15 btn-under-verification">Under Verification</span>
      }
      { props.showModal &&
        <button
          className="thick-font font-15"
          onClick={() => props.handleretake()}
        >
          Retake
        </button>
      }
    </Modal>
  );
};

export default SelfieModal;
