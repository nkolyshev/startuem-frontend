import React, {useMemo} from "react";
import {Wrapper} from "./Students-styled";
import {StudentsContainer} from "./StudentsContainer/StudentsContainer";
import {StudentsStore} from "../../models/StudentsStore";
import {observer} from "mobx-react-lite";
import {StudentsStoreProvider} from "./Students.context";


export const Students: React.FC = observer(() => {

    const store = useMemo<StudentsStore>(() => {
        return new StudentsStore();
    }, []);

    return (
        <StudentsStoreProvider store={store}>
            <Wrapper>
                <StudentsContainer/>
            </Wrapper>
        </StudentsStoreProvider>
    )
});