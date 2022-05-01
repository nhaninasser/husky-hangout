import React, { useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Arrow from 'react-arrows';
import useStoreContext from '../../utils/GlobalState';
import StoreProvider from '../../utils/GlobalState'

// const getItems = () =>
//   Array(10)
//     .fill(0)
//     .map((_, ind) => ({ id: `${ind}`}));


function Categories() {

    const [items] = useState( [
        {
            category: 'Sports',
        },
        {
            category: 'Party',
        },
        {
            category: 'Crafts',
        }
    ]);
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
            console.log(selected)
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {items.map(({ category }) => (
                <div className="bully">
                <CategoryCard
                    itemId={category} // NOTE: itemId is required for track items
                    category={category}
                    onClick={handleClick(category)}
                    setSelected={isItemSelected(category)}
                />
                </div>
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

function CategoryCard({ onClick, selected, category, itemId, key }) {
    const visibility = React.useContext(VisibilityContext);
    return (
        <div className="category-section"
            onClick={() => onClick(visibility)}
            style={{
                width: '220px',
            }}
            tabIndex={0}
        >
            <div className="category-card">
                <div className="category-title"><h2>{category}</h2></div>
                {/* <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
                <div>selected: {JSON.stringify(!!selected)}</div> */}
            </div>
            <div
                // style={{
                //     height: '20px',
                // }}
            />
        </div>
    );
}


export default Categories;