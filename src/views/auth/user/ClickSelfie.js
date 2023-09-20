import React, { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Webcam from "react-webcam";
import { UPLOAD_AVATAR } from "redux-store/sagas/saga-actions";
import { setGoBackType } from "redux-store/slices/auth";
/* import { clearUploadAvatarResponse } from "redux-store/slices/auth"; */
import SelfieModal from "../components/SelfieModal";

const videoConstraints = {
  width: "500px",
  height: "300px",
  facingMode: "user",
};

const ClickSelfie = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login", {
        replace: true,
      });
    }
  }, []);

  const [imgSrc, setImgSrc] = React.useState(null);
  const [showTip, setShowTip] = React.useState(true);
  const [showModalOutlet, setShowModalOutlet] = useOutletContext(false);

  React.useEffect(() => {
    if (showModalOutlet) {
      setShowModalOutlet(false);
      navigate("/auth/selectUser")
    }
  },[showModalOutlet])

  const dispatch = useDispatch();

  function handleSubmit() {
    const avatar = dataURLtoFile(
      imgSrc,
      "avatar" + user?._id || Math.round(Math.random() * 1000) + ".jpg"
    );

    dispatch({
      type: UPLOAD_AVATAR,
      payload: { avatar, token },
    });
  }

  return (
    <div className="clickSelfiePage">
      <div className="hideOnMobile">
        <CustomHeader />
      </div>

      { showTip && 
        <div className="useCamera">
          <div className="cameraIcon">
            <img
                src="../../../assets/images/icons/camera.png"
                alt="camera"
            />
          </div>
          <span className="thick-font font-15 dark-gray-text">If your camera is not loading, <a>download</a> our mobile app or use the desktop version</span>
          <div className="closeIcon" onClick={()=>setShowTip(false)}>
            <img
                src="../../../assets/images/icons/close.png"
                alt="close"
            />
          </div>
        </div>
      }

      <div className="pageContainer login-right-side">
        <div className="login-back-button font-24 font-thick blue-text">
          <Link onClick={()=>dispatch(setGoBackType("selectUser"))} to="/auth/selectUser" className="cursor-pointer">
            <img src="../../../assets/images/icons/back-arrow.png" alt="back-arrow" />
            Back
          </Link>
        </div>
        <div className="clickIcons hideOnMobile">
          <ul>
            <li>
              <a>
                <img
                    src="../../../assets/images/icons/selfie/face.png"
                  alt="selfie1"
                />
              </a>
              <span className="font-thick font-15 blue-text">Only 1 face</span>
            </li>
            <li>
              <a>
                <img
                    src="../../../assets/images/icons/selfie/blur.png"
                  alt="selfie2"
                />
              </a>
              <span className="font-thick font-15 blue-text">No blur</span>
            </li>
          </ul>
        </div>

        <div className="clickCamera">
          <div className="pageHeading align-items-center text-center">
            <h2 className="font-thick click-selfie-text">Click a Selfie</h2>
            <p className="font-15 font-thick dark-gray-text">Please take a clear selfie for best results</p>
          </div>
          <div className="clickCameraCover">
            <WebCameraCard imgSrc={imgSrc} setImgSrc={setImgSrc} />
          </div>
          {
            !imgSrc &&
            <div className="clickIcons showOnMobile">
            <ul>
              <li>
                <a>
                  <img
                      src="../../../assets/images/icons/selfie/face.png"
                    alt="selfie1"
                  />
                </a>
                <span className="font-thick font-13 blue-text">Only&nbsp;1&nbsp;face</span>
              </li>
              <li>
                <a>
                  <img
                      src="../../../assets/images/icons/selfie/blur.png"
                    alt="selfie2"
                  />
                </a>
                <span className="font-thick font-13 blue-text">No&nbsp;blur</span>
              </li>
              <li>
                <a>
                  <img
                      src="../../../assets/images/icons/selfie/mask.png"
                    alt="selfie1"
                  />
                </a>
                <span className="font-thick font-13 blue-text">No&nbsp;Mask</span>
              </li>
              <li>
                <a>
                  <img
                      src="../../../assets/images/icons/selfie/spect.png"
                    alt="selfie2"
                  />
                </a>
                <span className="font-thick font-13 blue-text">No&nbsp;spectacles</span>
              </li>
            </ul>
            </div>
          }
          {imgSrc && (
              <div className="retakeCard">
                <div className="d-flex justify-content-center mt-2">
                  <button
                      className="primarySmallBtn font-thick font-15"
                      onClick={() => setImgSrc(null)}
                  >
                    Retake
                  </button>
                  <SelfieModal onSubmit={handleSubmit} setImgSrc={setImgSrc} />
                </div>

                <span className="font-thick gray-text">
                By clicking on Submit your are agreeing to Kwikpic’s <a href="https://kwikpicmarketing.s3.ap-south-1.amazonaws.com/Kwikpic+Ai+Solutions's+TNC.pdf" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and <a href="https://kwikpicmarketing.s3.ap-south-1.amazonaws.com/Kwikpic+Ai+Solutions+Privacy+Policy.pdf" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                </span>
              </div>
          )}
        </div>

        <div className="clickIcons hideOnMobile">
          <ul>
            <li>
              <a>
                <img
                    src="../../../assets/images/icons/selfie/mask.png"
                  alt="selfie1"
                />
              </a>
              <span className="font-thick font-15 blue-text">No Mask</span>
            </li>
            <li>
              <a>
                <img
                  src="../../../assets/images/icons/selfie/spect.png"
                  alt="selfie2"
                />
              </a>
              <span className="font-thick font-15 blue-text">No spectacles</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const CustomHeader = () => {
  return (
    <div className="customHeader">
      <Navbar.Brand>
        {/* <div className="d-flex font-24 font-thick blue-text">
          <Link to="/auth/selectUser" className="mr-10px">
            <img src="../../../assets/images/icons/back-arrow.png" alt="back-arrow" />
          </Link> */}
          <img
            src="../../../../assets/images/global-images/logo.svg"
            alt="logo"
            />
        {/* </div> */}
      </Navbar.Brand>
    </div>
  );
};

const WebCameraCard = ({ imgSrc, setImgSrc }) => {
  return (
    <>
      {imgSrc ? (
        <>
          <img
            src={imgSrc}
            alt="selfie image"
            height={"410"}
            style={{
              objectFit: "contain",
            }}
          />
        </>
      ) : (
        <Webcam
          audio={false}
          height={"auto"}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
            <button
              className="secondarySmallButton thick-font font-15"
              onClick={() => {
                const imageSrc = getScreenshot();
                setImgSrc(imageSrc);
              }}
            >
              Click
            </button>
          )}
        </Webcam>
      )}
    </>
  );
};

export default ClickSelfie;

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
