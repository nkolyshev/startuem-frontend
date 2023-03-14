import {observer} from "mobx-react-lite";
import {StudentsTable} from "../StudentsTable/StudentsTable";
import React, {useMemo} from "react";
import {EventsStore} from "../../../models/EventsStore/EventsStore";
import {EventsStoreProvider} from "../../../context/Events.context";

export const StudentsTableContainer = observer(() => {

    const eventsStore = useMemo<EventsStore>(() => {
        return new EventsStore();
    }, []);

    return <EventsStoreProvider store={eventsStore}><StudentsTable/></EventsStoreProvider>
})