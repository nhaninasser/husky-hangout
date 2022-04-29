import React, { useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Arrow from 'react-arrows';
import hockey from './assets/images/hockey.png';



// const getItems = () =>
//   Array(10)
//     .fill(0)
//     .map((_, ind) => ({ id: `${ind}`}));

const getItems = () => [
        {
            id: 1,
            event: 'hockey',
            category: 'Sports',
            image: {hockey},
            description: 'this is a hockey event for college students',
            attending: 52
        },
        {
            id: 2,
            event: 'House Party',
            category: 'Party',
            image: '',
            description: 'Want to party, head over! Shots Shots Shots!',
            attending: 965
        },
        {
            id: 3,
            event: 'Crocket',
            category: 'Crafts',
            image: '',
            description: 'create something great with your closest group of friends!',
            attending: 45
        }
    ];

    function Events() {
        const [items, setItem] = useState(getItems);
        const [selected, setSelected] = useState([]);
        // const [position, setPosition] = React.useState(0);

        const isItemSelected = (id) => !!selected.find((el) => el === id);

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
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                {items.map(({ id, event, category, image, description, attending }) => (
                    <Card
                        itemId={id} // NOTE: itemId is required for track items
                        title={event}
                        category={category}
                        image={image}
                        description={description}
                        attending={attending}
                        key={id}
                        onClick={handleClick(id)}
                        selected={isItemSelected(id)}
                    />
                ))}
            </ScrollMenu>
        );
    }

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
        React.useContext(VisibilityContext);

    return (
        <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            Left
        </Arrow>
    );
}

function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
        <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
            Right
        </Arrow>
    );
}

function Card({ onClick, selected, title, image, description, attending, itemId }) {
    const visibility = React.useContext(VisibilityContext);
    console.log({image})
    return (
        <div
            onClick={() => onClick(visibility)}
            style={{
                width: '400px',
            }}
            tabIndex={0}
        >
            <div className="event-card">
                <div><h2>{title}</h2></div>
                <img scr={image} alt='' className="resumeImage" ></img>
                <div>
                    <h3>Description</h3>
                </div>
                <div>{description}</div>
                <div>
                    <h5>Attending: {attending}</h5>
                </div>
                {/* <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
                <div>selected: {JSON.stringify(!!selected)}</div> */}
            </div>
            <div
                style={{
                    height: '200px',
                }}
            />
        </div>
    );
}

export default Events;