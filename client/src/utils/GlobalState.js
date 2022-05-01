import {createContext, useContext, useEffect, useState } from 'react';

//going to pass something to the react application
const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [globalState, setGlobalState ] = useState({
        selectedCategory: undefined,
        categories: [
            {
                category: 'Sports',
            },
            {
                category: 'Party',
            },
            {
                category: 'Crafts',
            }
        ]
        
});

function selectCategory(categoryName) {
    setGlobalState({...globalState, selectedCategory: categoryName});
}

useEffect( () => {
    console.log("global State changed in Store", globalState);
}, [globalState])

return (
    <StoreContext.Provider value={{globalState, selectCategory}}>
        {children}
    </StoreContext.Provider>
);
}

export default function useStoreContext() {
    const { globalState, selectCategory } = useContext(StoreContext);

    return { globalState, selectCategory };
}