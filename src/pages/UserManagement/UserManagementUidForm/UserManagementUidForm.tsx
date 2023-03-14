import {FormsWrapper} from "./UserManagementUidForm-styled";
import {UserManagementCardReaderForm} from "./UserManagementCardReaderForm/UserManagementCardReaderForm";
import {UserManagementUserUidForm} from "./UserManagementUserUidForm/UserManagementUserUidForm";
import {observer} from "mobx-react-lite";
import {useMemo} from "react";
import {EventsStore} from "../../../models/EventsStore/EventsStore";
import {EventsStoreProvider} from "../../../context/Events.context";

export const UserManagementUidForm = observer(() => {

    const eventsStore = useMemo<EventsStore>(() => {
        return new EventsStore();
    }, []);

    return (
        <EventsStoreProvider store={eventsStore}>
            <FormsWrapper>
                <UserManagementCardReaderForm/>
                <UserManagementUserUidForm/>
            </FormsWrapper>
        </EventsStoreProvider>
    )
})