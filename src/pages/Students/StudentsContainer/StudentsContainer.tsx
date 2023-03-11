import {observer} from "mobx-react-lite";
import {useStudentsStore} from "../Students.context";
import {StudentsFormCreate} from "../StudentsFormCreate/StudentsFormCreate";
import React from "react";
import {StudentsTableContainer} from "../StudentsTableContainer/StudentsTableContainer";

export const StudentsContainer = observer(() => {

    const store = useStudentsStore();

    return store?.lesson ? <StudentsTableContainer/> : <StudentsFormCreate/>
})