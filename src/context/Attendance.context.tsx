import React from "react";
import {AttendanceStore} from "../models/AttendanceStore/AttendanceStore";

const AttendanceStoreContext = React.createContext<AttendanceStore | null>(null);

interface StoreProviderProps {
    store: AttendanceStore | null;
    children: JSX.Element | JSX.Element[];
}

export const AttendanceStoreProvider: React.FC<StoreProviderProps> = ({ children, store }) => {
    return (
        <AttendanceStoreContext.Provider value={store}>{children}</AttendanceStoreContext.Provider>
    );
};

export const useAttendanceStore = () => React.useContext(AttendanceStoreContext);