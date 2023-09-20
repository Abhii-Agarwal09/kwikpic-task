/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScroll } from "react-infinite-scroll-hook";
import { GET_MY_GROUPS } from "redux-store/sagas/saga-actions";

const GroupView = ({ groups, thumb, currentPage, count, setCurrentPage }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const RenderGroups = () => {
    setLoading(true);
    dispatch({
      type: GET_MY_GROUPS,
      payload: { ...currentPage, page: currentPage.page + 1 },
    });
    setCurrentPage((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  useEffect(() => {
    setLoading(false);
  }, [groups.length]);

  const hasNextPage = groups.length < count && groups.length !== 0;

  const InfiniteList = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: RenderGroups,
    rootMargin: "0px",
  });

  return (
    <div ref={InfiniteList} className="row">
      {groups.map((group) => {
        return (
          <GroupViewCard
            singleGroup={group}
            key={group.group._id}
            thumb={thumb}
          />
        );
      })}
      {/* </div> */}
      {loading && (
        <div className="d-flex justify-content-center vw-100 p-20">
          <div className="loading">Loading groups...</div>
        </div>
      )}
    </div>
  );
};

const GroupViewCard = ({ thumb, singleGroup }) => {
  const { groupLayout } = useSelector((state) => state.groups);
  const { group: { name, allPicsCount, icon, _id, isPrivate, createdAt } = {}, joinedAt } =
    singleGroup || {};

    return (
          groupLayout === "grid" ?
            <GroupViewCardGrid icon={icon} thumb={thumb} groupName={name} allPicsCount={allPicsCount} isPrivate={isPrivate} id={_id} />
          :
            <GroupViewCardList icon={icon} thumb={thumb} groupName={name} allPicsCount={allPicsCount} isPrivate={isPrivate} id={_id} createdAt={createdAt} joinedAt={joinedAt} />
    );
};

const GroupViewCardGrid = ({ icon, thumb, groupName, allPicsCount, isPrivate, id }) => {
  return(
    <Link to={"/gallary?groupId=" + id} className="col-md-3 mb-4">
            <div className="groupViewCard d-flex flex-column">
                <div className="groupThumbnail">
                    <img src={icon || thumb} alt="thumb"/>
                </div>
                <div className="groupContent">
                    <div className="d-flex align-items-center card-name">
                      <span className="me-1">
                        {groupName || "No Name"}
                      </span>
                        {!isPrivate && <img width="14px" src="../../../assets/images/icons/group.png"/>}
                    </div>
                    <small className="card-count thick-font">{allPicsCount || 0} Photos</small>
                </div>
            </div>
        </Link>
  )
}

const GroupViewCardList = ({ icon, thumb, groupName, allPicsCount, isPrivate, id, createdAt, joinedAt }) => {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  const JoinedAt = new Date(joinedAt)
  return(
    <Link to={"/gallary?groupId=" + id} className="group-view-card-wrapper">
            <div className="group-view-card-outer">
                <div className="group-view-card-thumb">
                    <img src={icon || thumb} alt="thumb"/>
                </div>
                <div className="group-view-card-name-outer">
                    <div className="group-view-card-name">
                      <p className="group-view-card-name-inner font-thick font-15 bright-blue-text text-clip">
                        {groupName || "No Name"}
                      </p>
                        {!isPrivate && <img width="14px" height="14px" src="../../../assets/images/icons/group.png"/>}
                    </div>
                    <small className="group-view-card-photo-count mobile-photo-count med-font font-12 gray-text">{allPicsCount || 0} Photos</small>
                </div>
                <div className="group-view-card-photo-count pc-photo-count med-font font-12 gray-text">
                  {allPicsCount || 0} Photos
                </div>
                <div className="text-clip group-view-card-date med-font font-12 gray-text pc-photo-count">
                  {createdAt===joinedAt ? "Created" : "Joined"} on {[pad(JoinedAt.getDate()), pad(JoinedAt.getMonth()+1), JoinedAt.getFullYear()].join('/')}
                </div>
            </div>
        </Link>
  )
}

const EmptyCard = (props) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="groupViewCard d-flex flex-column">
        <div className="groupEmptyThumbnail">
          {/* need to add image source here */}
          <img src="../../../assets/images/icons/Rectangle.png" alt="thumb" />
        </div>
        <div className="groupContent">
          <span>No Name</span>
          <small>0 Photos</small>
        </div>
      </div>
    </div>
  );
};

export default GroupView;
