import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./components/Auth/Auth";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<App/>}></Route>
                <Route path='/auth' element={<Auth/>}></Route>
                <Route path='*' element={<div>not found 404</div>}></Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)