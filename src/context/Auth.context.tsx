import React from "react";
import {AuthStore} from "../models/AuthStore/AuthStore";

const AuthStoreContext = React.createContext<AuthStore | null>(null);

interface StoreProviderProps {
    store: AuthStore | null;
    children: JSX.Element | JSX.Element[];
}

export const AuthStoreProvider: React.FC<StoreProviderProps> = ({ children, store }) => {
    return (
        <AuthStoreContext.Provider value={store}>{children}</AuthStoreContext.Provider>
    );
};

export const useAuthStore = () => React.useContext(AuthStoreContext);