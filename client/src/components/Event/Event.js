import React from 'react';

const Event = ({ item }) => {
    const { deleteEvent } = deleteEvent;

    return (
        <li>
            <span className="Event">{item.event}</span>
            <span className="Time">{item.time}</span>
            <span className="Action" onClick={() => deleteEvent(item.id)}>&#10007;</span>
        </li>
    );
}

export default Event;