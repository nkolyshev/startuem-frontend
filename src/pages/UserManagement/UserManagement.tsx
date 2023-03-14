import {useMemo} from "react";
import {UserManagementStoreProvider} from "../../context/UserManagement.context";
import {UserManagementStore} from "../../models/UserManagmentStore/UserManagementStore";
import {UserManagementContent} from "./UserManagementContent/UserManagementContent";

export const UserManagement = () => {

    const userManagement = useMemo<UserManagementStore>(() => {
        return new UserManagementStore();
    }, []);

    return (
        <UserManagementStoreProvider store={userManagement}>
            <UserManagementContent/>
        </UserManagementStoreProvider>
    )

}