import React from "react";
import EventsMobile from "../components/Events";
import Categories from "../components/Categories";


function EventsPage(){
    return(
        <div>
            <Categories></Categories>
            <EventsMobile></EventsMobile>
        </div>
    )
}

export default EventsPage;