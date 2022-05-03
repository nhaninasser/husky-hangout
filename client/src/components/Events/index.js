import React, { useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Arrow from "react-arrows";
import useScreenSize from "../../hooks/screenSize/useScreenSize";
import { QUERY_EVENTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

// const getItems = () =>
//   Array(10)
//     .fill(0)
//     .map((_, ind) => ({ id: `${ind}`}));

function EventsMobile() {
  const { isDesktop } = useScreenSize();
  // const [items, setItem] = useState(getItems);
  const [selected, setSelected] = useState([]);
  // const [position, setPosition] = React.useState(0);
  const { data } = useQuery(QUERY_EVENTS);
  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const events = data?.events || [];
//   console.log(events);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };
  return (
    !isDesktop && (
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {events.map(
          ({
            eventName,
            eventDate,
            eventText,
            createdAt,
            username,
            attending,
            id,
          }) => {
            return (
              <Card
                itemId={id}
                eventName={eventName}
                eventDate={eventDate}
                eventText={eventText}
                createdAt={createdAt}
                username={username}
                attending={attending}
                onClick={handleClick(id)}
                selected={isItemSelected(id)}
              />
            );
          }
        )}
      </ScrollMenu>
    )
  );
}

function LeftArrow() {
  const { isDesktop } = useScreenSize();
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    !isDesktop && (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        Left
      </Arrow>
    )
  );
}

function RightArrow() {
  const { isDesktop } = useScreenSize();
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    !isDesktop && (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        Right
      </Arrow>
    )
  );
}

function Card({
  onClick,
  selected,
  eventName,
  eventDate,
  eventText,
  createdAt,
  username,
  attending,
  itemId,
}) {
  const visibility = React.useContext(VisibilityContext);
  // console.log({ myImg })
  const { isDesktop } = useScreenSize();
  return (
    !isDesktop && (
      <div
        onClick={() => onClick(visibility)}
        style={{
          width: "400px",
        }}
        tabIndex={0}
      >
        <div className="event-card">
          <div className="event-title">
            <h2>{eventName}</h2>
          </div>
          <div className="flex">
            <img src="" alt="" className="event-image"></img>
          </div>
          <div className="description-align">
            <h3>{username}</h3>
          </div>
          <div className="eventDescription">
            <h5 className="text">{eventText}</h5>
          </div>
          <div className="attending">
            <h5>EventDate: {eventDate}</h5>
            <h5>Attending: {attending}</h5>
          </div>
          <div>
            visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}
          </div>
          <div>selected: {JSON.stringify(!!selected)}</div>
          <div>Created At: {createdAt}</div>
        </div>
        <div
          style={{
            height: "200px",
          }}
        />
      </div>
    )
  );
}

export default EventsMobile;
