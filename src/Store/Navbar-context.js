import { createContext, useState } from "react";

export const navbarContext = createContext({
  platformShown: false,
  setPlatformShown: () => {},
  sortByShown: false,
  setSortByShown: () => {},
  categoriesShown: false,
  setCategoriesShown: () => {},
  ulIsShown: false,
  setUlIsShown: () => {},
  hideSubListsHandler: () => {},
});

function NavbarProvider(props) {
  const [platformShown, setPlatformShown] = useState(false);
  const [sortByShown, setSortByShown] = useState(false);
  const [categoriesShown, setCategoriesShown] = useState(false);
  const [ulIsShown, setUlIsShown] = useState(false);
  function hideSubListsHandler(event) {
    if (event.target.outerText !== "Platforms") {
      setPlatformShown(false);
    }
    if (event.target.outerText !== "Sort-by") {
      setSortByShown(false);
    }
    if (event.target.outerText !== "Categories") {
      setCategoriesShown(false);
    }
  }

  return (
    <navbarContext.Provider
      value={{
        platformShown,
        setPlatformShown,
        sortByShown,
        setSortByShown,
        categoriesShown,
        setCategoriesShown,
        ulIsShown,
        setUlIsShown,
        hideSubListsHandler,
      }}
    >
      {props.children}
    </navbarContext.Provider>
  );
}

export default NavbarProvider;
