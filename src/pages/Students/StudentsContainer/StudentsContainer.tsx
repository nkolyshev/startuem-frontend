import {observer} from "mobx-react-lite";
import {useStudentsStore} from "../Students.context";
import {StudentsFormCreate} from "../StudentsFormCreate/StudentsFormCreate";
import React, {useEffect} from "react";
import {StudentsTable} from "../StudentsTable/StudentsTable";

export const StudentsContainer = observer(() => {

    const store = useStudentsStore();

    useEffect(() => {
        if (store?.studentsFormValues) {
            store?.fetchStudents();
        }
    }, [store, store?.studentsFormValues])

    return store?.students ? <StudentsTable/> : <StudentsFormCreate/>
})