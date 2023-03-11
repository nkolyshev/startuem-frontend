import React from "react";
import {StudentsStore} from "../../models/StudentsStore/StudentsStore";

const StudentsStoreContext = React.createContext<StudentsStore | null>(null);

interface StoreProviderProps {
    store: StudentsStore | null;
    children: JSX.Element;
}

export const StudentsStoreProvider: React.FC<StoreProviderProps> = ({ children, store }) => {
    return (
        <StudentsStoreContext.Provider value={store}>{children}</StudentsStoreContext.Provider>
    );
};

export const useStudentsStore = () => React.useContext(StudentsStoreContext);