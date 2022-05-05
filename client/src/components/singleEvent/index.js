import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../../utils/queries";

export default function SingleEvent() {
  const { id: eventId } = useParams();

  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: eventId },
  });

  const event = data?.event || {};

  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-height">
      <div className="event-title">
      <h2>5/4/2021 9:00pm</h2>
      </div>
      <div className="single-event-card">
        {/* Need to create eventDate input for the backend */}
        <div className="event-title">
        <h2>{event.eventName}</h2>
          </div>
          <div className="description-align">
            <div className="singleEventDescription">
                <h5 className="singleEventText">{event.eventText}</h5>
            </div>
          </div>
          <div className="attending">
            <h3>Attending: {event.attending}</h3>
          </div>
      </div>
    </div>
  );
}
