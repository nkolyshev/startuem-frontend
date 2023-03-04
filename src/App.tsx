import React from 'react';
import {RouterConfig} from "./routing/router-config";
import {Header} from "./components/common/Header/Header";
import { Footer } from './components/common/Footer/Footer';
import {GlobalStyle} from "./App-styled";
import 'antd/dist/reset.css';

function App() { //app компонент. возвращает вёрстку.
  return (
    <>
        <GlobalStyle/>
        <div>
            <Header/>
            <main>
                <RouterConfig/>
            </main>
            <Footer/>
        </div>
    </>
  );
}

export default App;
