import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/client";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Arrow from "react-arrows";

// const getItems = () =>
//   Array(10)
//     .fill(0)
//     .map((_, ind) => ({ id: `${ind}`}));

function Categories() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {categories.map((item) => (
        <div className="bully">
          <CategoryCard
            key={item._id}
            onClick={() => {
              handleClick(item._id);
            }}
          />
          {item.name}
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
          <h2>{category}</h2>
        </div>
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
