/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import React from "react";
import { GET_SINGLE_GROUP } from "../../../../../redux-store/sagas/saga-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const EventView = () => {
  const dispatch = useDispatch();

  const { activeEvent, activeEventId, activeEventName, activeEventDate } =
    useSelector((state) => {
      console.log(state);
      console.log(state.analytics.activeEvent);
      return state.analytics;
    });

  useEffect(() => {
    dispatch({
      type: GET_SINGLE_GROUP,
      payload: "65080fb815d5914436a502e4",
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_SINGLE_GROUP,
      payload: activeEventId,
    });
  }, [activeEventId]);

  console.log("Active element: ", activeEvent);
  console.log("Active element Id: ", activeEventId);
  console.log("Active element Name: ", activeEventName);
  console.log("Active element Date: ", activeEventDate);

  return (
    <div className="event_view_container">
      {/* Name and date container */}
      <div className="event__details-container">
        <p>
          <span className="active__event-name">{activeEventName}</span>{" "}
          <span className="active__event-date">{activeEventDate}</span>
          {activeEventName && (
            <span className="active__event-name-underline"></span>
          )}
        </p>
      </div>
      {/* Analytics container */}
      <div className="analytics__container">
        <div className="analytic">
          <p className="analytic__heading">Total Impressions</p>
          <p className="analytic_number">
            {activeEvent?.group?.impressions || 0}
          </p>
        </div>
        <div className="analytic">
          <p className="analytic__heading">Photos Discovered</p>
          <p className="analytic_number">
            {activeEvent?.group?.discoveries || 0}{" "}
            <span className="analytic__number-total">
              /{" "}
              {activeEvent?.group?.totalImages +
                activeEvent?.group?.totalVideos || 0}
            </span>
          </p>
        </div>
        <div className="analytic">
          <p className="analytic__heading">Photos Downloaded</p>
          <p className="analytic_number">
            {activeEvent?.group?.downloads || 0}
          </p>
        </div>
        <div className="analytic">
          <p className="analytic__heading">Registered Users</p>
          <p className="analytic_number">
            {activeEvent?.group?.participants || 0}
          </p>
        </div>
      </div>
      <table className="table">
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Impressions</th>
          <th>Results</th>
          <th>Discoveries</th>
          <th>Downloads</th>
        </tr>

        {activeEvent?.participants?.map((member, index) => {
          return (
            <tr key={index}>
              <td>{member?.userName}</td>
              <td>{member?.email}</td>
              <td>{member?.phone}</td>
              <td>{member?.impressions}</td>
              <td>{member?.results}</td>
              <td>{member?.discovered}</td>
              <td>{member?.downloaded}</td>
            </tr>
          );
        })}
      </table>
      {/* <ul>
        <div className={`${styles.participant_container}`}>
          <p>User Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Impressions</p>
          <p>Results</p>
          <p>Discoveries</p>
          <p>Downlaods</p>
        </div>
        {activeEvent?.participants?.map((member, index) => {
          return (
            <div key={index} className={`${styles.participant_container}`}>
              <p>{member?.userName}</p>
              <p>{member?.email}</p>
              <p>{member?.phone}</p>
              <p>{member?.impressions}</p>
              <p>{member?.results}</p>
              <p>{member?.discovered}</p>
              <p>{member?.downloaded}</p>
            </div>
          );
        })}
      </ul> */}
    </div>
  );
};

export default EventView;
