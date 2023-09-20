import React from "react";
import EventList from "./EventList";
import EventView from "./EventView";

const Analytics = () => {
  return (
    <div style={{ display: "flex", height: "90vh", gap: "2rem" }}>
      <EventList />
      <EventView />
    </div>
  );
};

export default Analytics;
