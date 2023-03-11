import React, {useMemo} from 'react';
import {GlobalStyle} from "./App-styled";
import 'antd/dist/reset.css';
import {Root} from "./components/Root/Root";
import {AuthStore} from "./models/AuthStore/AuthStore";
import {AuthStoreProvider} from "./context/Auth.context";

function App() {

    const authStore = useMemo<AuthStore>(() => {
        return new AuthStore();
    }, []);

    return (
        <AuthStoreProvider store={authStore}>
            <GlobalStyle/>
            <Root/>
        </AuthStoreProvider>
    );
}

export default App;
