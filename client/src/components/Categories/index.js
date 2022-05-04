import React, { useState } from "react";
// import { useStoreContext } from "../../utils/GlobalState";
import useScreenSize from "../../hooks/screenSize/useScreenSize";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Arrow from "react-arrows";

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

  const { isDesktop } = useScreenSize();
  const [selected, setSelected] = useState([]);
  const { data } = useQuery(QUERY_CATEGORIES);
  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const categories = data?.categories || [];
  console.log(categories);

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
  console.log(selected);
  return (
    !isDesktop && (
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {items.map(({ category }) => (
          <div className="bully">
            <CategoryCard
              itemId={category}
              category={category}
              onClick={handleClick(category)}
              setSelected={isItemSelected(category)}
            />
          </div>
        ))}
      </ScrollMenu>
    )
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

function CategoryCard({
  onClick,
  selected,
  category,
  itemId,
  key
}) {

  
  const visibility = React.useContext(VisibilityContext);
  return (
    <div
      className="category-section"
      onClick={() => onClick(visibility)}
      style={{
        width: "220px",
      }}
      tabIndex={0}
    >
      <div className="category-card">
        <div className="category-title"> <h2>{category}</h2>         
        </div>
        {/* <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div> */}
      </div>
      <div
        style={{
          height: "20px",
        }}
      />
    </div>
  );
}

export default Categories;
