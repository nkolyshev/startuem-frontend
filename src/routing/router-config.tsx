import React from "react";
import {Route, Routes} from "react-router-dom";
import {PagePath} from "./page-path";
import {Home} from "../pages/Home/Home";
import {Profile} from "../pages/Profile";
import {Schedule} from "../pages/Schedule";
import {Students} from "../pages/Students/Students";

export const RouterConfig: React.FC = () => {
    return (
        <Routes>
            <Route path={PagePath.home} index element={<Home/>}/>
            <Route path={PagePath.profile} index element={<Profile/>}/>
            <Route path={PagePath.schedule} index element={<Schedule/>}/>
            <Route path={PagePath.students} index element={<Students/>}/>
        </Routes>
    )
}