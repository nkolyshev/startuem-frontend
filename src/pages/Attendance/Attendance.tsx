import {useMemo} from "react";
import {AttendanceStore} from "../../models/AttendanceStore/AttendanceStore";
import {AttendanceStoreProvider} from "../../context/Attendance.context";
import {AttendanceTable} from "./AttedanceTable/AttendanceTable";

export const Attendance = () => {

    const store = useMemo<AttendanceStore>(() => {
        return new AttendanceStore();
    }, []);

    return (
        <AttendanceStoreProvider store={store}>
            <AttendanceTable/>
        </AttendanceStoreProvider>
    )

}