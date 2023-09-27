/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import {
  GET_MY_GROUPS,
  GET_SINGLE_GROUP,
} from "../../../../redux-store/sagas/saga-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useInfiniteScroll } from "react-infinite-scroll-hook";
import { toast } from "react-toastify";

const EventList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState({ page: 1, limit: 20 });

  const { groups, count, initialLoader } = useSelector((state) => state.groups);
  const { activeEventId } = useSelector((state) => {
    return state.analytics;
  });
  // const { firstTime } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch({
      type: GET_MY_GROUPS,
      payload: currentPage,
    });
  }, [dispatch]);
  // const hasNoGroups = groups?.length === 0 && !initialLoader;

  const [loading, setLoading] = useState(false);
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

  // set first group as active
  useEffect(() => {
    const firstGroup = groups[0]?.group;
    if (firstGroup) {
      const { _id, name, createdAt } = firstGroup;
      const payload = {
        groupId: _id,
        groupName: name,
        groupDate: formatDateToCustomFormat(createdAt),
      };
      toast.success("Hang on a sec, fetching your group details...");
      dispatch({
        type: "SET_ACTIVE_GROUP",
        payload,
      });
    }
  }, [groups]);

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

  function formatDateToCustomFormat(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate
      .replace(/\b(\d{1})\b/g, "1st")
      .replace(/\b(\d{2})\b/g, "$1th");
  }

  const setActiveGroup = (e) => {
    console.log(e);
    if (!e.target.classList.contains("active-event")) {
      toast.success("Hang on a sec, fetching your group details...");
    }
    const { groupId, groupName, groupDate } = e.target.dataset;
    const payload = { groupId, groupName, groupDate };
    dispatch({
      type: "SET_ACTIVE_GROUP",
      payload,
    });
  };

  return (
    <div
      className="events-list-container"
      style={{ height: "100%", overflowY: "scroll", flex: 0.35 }}
    >
      <h1 className="events-list-heading">Analytics</h1>
      <p className="event-list-caption">All Events Groups</p>
      <div ref={InfiniteList}>
        {groups.map((group, index) => {
          if (!group.isAdmin) return null;
          const date = new Date(group?.group?.createdAt).toLocaleDateString();
          const formattedDate = formatDateToCustomFormat(date);
          return (
            <div
              key={index}
              className={`event ${
                activeEventId === group?.group?._id ? "active-event" : ""
              }`}
              onClick={setActiveGroup}
              data-group-id={group?.group?._id || null}
              data-group-name={group?.group?.name || "No name"}
              data-group-date={formattedDate || "No date"}
            >
              Event Name - {group?.group?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
