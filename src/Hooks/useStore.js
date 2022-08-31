import React  from "react";
import stores from "../Stores";

const storesContext = React.createContext(stores);

export const useStores = () => React.useContext(storesContext);

export const useStore = (store) => React.useContext(storesContext)[store];
