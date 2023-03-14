import React from "react";
import {UserManagementStore} from "../models/UserManagmentStore/UserManagementStore";

const UserManagementStoreContext = React.createContext<UserManagementStore | null>(null);

interface StoreProviderProps {
    store: UserManagementStore | null;
    children: JSX.Element | JSX.Element[];
}

export const UserManagementStoreProvider: React.FC<StoreProviderProps> = ({ children, store }) => {
    return (
        <UserManagementStoreContext.Provider value={store}>{children}</UserManagementStoreContext.Provider>
    );
};

export const useUserManagementStore = () => React.useContext(UserManagementStoreContext);