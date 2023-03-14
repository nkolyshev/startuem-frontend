import React, {useMemo} from "react";
import {StudentsContainer} from "./StudentsContainer/StudentsContainer";
import {StudentsStore} from "../../models/StudentsStore/StudentsStore";
import {observer} from "mobx-react-lite";
import {StudentsStoreProvider} from "./Students.context";
import {FormWrapper} from "../../components/common/common-styled";


export const Students: React.FC = observer(() => {

    const store = useMemo<StudentsStore>(() => {
        return new StudentsStore();
    }, []);

    return (
        <StudentsStoreProvider store={store}>
            <FormWrapper>
                <StudentsContainer/>
            </FormWrapper>
        </StudentsStoreProvider>
    )
});