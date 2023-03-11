import React from "react";
import {EventsStore} from "../models/EventsStore/EventsStore";

const EventsStoreContext = React.createContext<EventsStore | null>(null);

interface StoreProviderProps {
    store: EventsStore | null;
    children: JSX.Element | JSX.Element[];
}

export const EventsStoreProvider: React.FC<StoreProviderProps> = ({ children, store }) => {
    return (
        <EventsStoreContext.Provider value={store}>{children}</EventsStoreContext.Provider>
    );
};

export const useEventsStore = () => React.useContext(EventsStoreContext);