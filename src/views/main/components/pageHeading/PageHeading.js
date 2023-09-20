import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroupLayout } from "redux-store/slices/group";
import PrimaryButton from "../../../components/button/PrimaryButton";
import SecondaryButton from "../../../components/button/SecondaryButton";

const PageHeading = (props) => {
  const { groupLayout } = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  return (
    <div className="pageHeading d-flex justify-content-between align-items-center">
      <div className="w-100 d-flex justify-content-between align-items-center onMobile-mb-2">
        <div className="d-flex align-items-center">
          {/*{!props.goBack &&*/}
          {/*    <img width="14" src="../../../assets/images/icons/back-arrow.png" alt="search"/>*/}
          {/*}*/}
          <h2 className="mb-0 pageHeading-title font-thick">{props.title}</h2>
        </div>

        <span className="for-mobile m-d-flex align-items-center">
          <div>
            <img src="../../../assets/images/icons/search.png" alt="search" />
          </div>
          <div className="ms-2 cursor-pointer">
            {groupLayout === "grid" ? (
              <img
                src="../../../assets/images/icons/list.png"
                alt="list"
                onClick={() => dispatch(setGroupLayout("list"))}
              />
            ) : (
              <img
                src="../../../assets/images/icons/grid.png"
                alt="grid"
                onClick={() => dispatch(setGroupLayout("grid"))}
              />
            )}
          </div>
        </span>
      </div>
      {props.rightBar && (
        <div className="d-flex align-items-center pageHeadingButtons">
          <span className="for-pc">
            <img src="../../../assets/images/icons/search.png" alt="search" />
          </span>
          <PrimaryButton title="Join a group" />
          <div className="for-pc me-2"></div>
          <SecondaryButton title="Create a group" onClick={props.handleShow} />
          <span className="for-pc cursor-pointer">
            {groupLayout === "grid" ? (
              <img
                src="../../../assets/images/icons/list.png"
                alt="list"
                onClick={() => dispatch(setGroupLayout("list"))}
              />
            ) : (
              <img
                src="../../../assets/images/icons/grid.png"
                alt="grid"
                onClick={() => dispatch(setGroupLayout("grid"))}
              />
            )}
          </span>
          {/* <button className='secondaryButton' >
                        Create a group
                    </button> */}
        </div>
      )}
    </div>
  );
};
export default PageHeading;
