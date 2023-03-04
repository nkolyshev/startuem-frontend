import {observer} from "mobx-react-lite";
import {StudentsStore} from "../../../models/StudentsStore";
import {StudentsStoreProvider} from "./StudentsFormCreate.context";
import {StudentsFormCreate} from "./StudentsFormCreate";

const store = new StudentsStore();

export const StudentsFormCreateContainer = observer(() => {
    return (
        <StudentsStoreProvider store={store}>
            <StudentsFormCreate/>
        </StudentsStoreProvider>
    )
})