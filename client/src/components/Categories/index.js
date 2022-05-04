import React, { useState } from "react";
// import { useStoreContext } from "../../utils/GlobalState";
import useScreenSize from "../../hooks/screenSize/useScreenSize";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Arrow from "react-arrows";

// const [catName] = useState( [
//   {
//       category: 'Sports',
//   },
//   {
//       category: 'Party',
//   },
//   {
//       category: 'Crafts',
//   }
// ]);

function Categories() {  

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
        {categories.map(({ name, id }) => (
          <div className="bully">
            <CategoryCard
              name={name}
              onClick={() => {
                handleClick(id);
              }}
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
  itemId,
  catName,
}) {

  // const [cat, setCat] = useState();
  const visibility = React.useContext(VisibilityContext);
  // useEffect(() => {
  //   switch(catName){
  //     case "Sports":
  //       setCat(Sports);
  //       break;
  //       default:
  //       console.error("no category found!");
  //   }
  // }, []);
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
        <div className="category-title">          
        </div>
        <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
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
