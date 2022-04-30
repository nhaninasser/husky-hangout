import React, { useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Arrow from 'react-arrows';
import useScreenSize from '../../hooks/screenSize/useScreenSize';
import hockey from './assets/images/hockey.png';
import party from './assets/images/houseParty.jpg';
import knitting from './assets/images/knitting.jpg';



// const getItems = () =>
//   Array(10)
//     .fill(0)
//     .map((_, ind) => ({ id: `${ind}`}));


const getItems = () => [
    {
        id: 1,
        event: 'hockey',
        category: 'Sports',
        image: hockey,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        attending: 52
    },
    {
        id: 2,
        event: 'House Party',
        category: 'Party',
        image: party,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        attending: 965
    },
    {
        id: 3,
        event: 'Knitting',
        category: 'Crafts',
        image: knitting,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        attending: 45
    }
];

function EventsMobile() {
    const { isDesktop } = useScreenSize();
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
    return !isDesktop && (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {items.map(({ id, event, category, image, description, attending }) => {
                return (
                <Card
                    itemId={id} // NOTE: itemId is required for track items
                    title={event}
                    category={category}
                    myImg={image}
                    description={description}
                    attending={attending}
                    key={id}
                    onClick={handleClick(id)}
                    selected={isItemSelected(id)}
                />
            )})}
        </ScrollMenu>
    );
}

function LeftArrow() {
    const { isDesktop } = useScreenSize();
    const { isFirstItemVisible, scrollPrev } =
        React.useContext(VisibilityContext);

    return !isDesktop && (
        <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            Left
        </Arrow>
    );
}

function RightArrow() {
    const { isDesktop } = useScreenSize();
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return !isDesktop && (
        <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
            Right
        </Arrow>
    );
}

function Card({ onClick, selected, title, myImg, description, attending, itemId }) {
    const visibility = React.useContext(VisibilityContext);
    console.log({ myImg })
    const { isDesktop } = useScreenSize();
    return !isDesktop && (
        <div
            onClick={() => onClick(visibility)}
            style={{
                width: '400px',
            }}
            tabIndex={0}
        >
            <div className="event-card">
                <div className="event-title"><h2>{title}</h2></div>
                <div className='flex'>
                    <img src={myImg} alt='' className="event-image"></img>
                </div>
                <div className="description-align">
                    {/* <h3>Description</h3> */}
                </div>
                <div className="eventDescription">
                    <h5 className="text">{description}</h5>
                </div>
                <div className="attending">
                    <h5>Attending: {attending}</h5>
                </div>
                <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
                <div>selected: {JSON.stringify(!!selected)}</div>
            </div>
            <div
                style={{
                    height: '200px',
                }}
            />
        </div>
    );
}


export default EventsMobile;