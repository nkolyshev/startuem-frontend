import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {PagePath} from "./page-path";
import {Home} from "../pages/Home/Home";
import {Profile} from "../pages/Profile";
import {Schedule} from "../pages/Schedule";
import {Login} from "../pages/Login/Login";
import {NotFound} from "../pages/NotFound/NotFound";
import {Students} from "../pages/Students/Students";
import {Forbidden} from "../pages/Forbidden/Forbidden";

export const RootRouter: React.FC = () => {
    return (
        <Routes>

            <Route path={'*'} element={<NotFound/>}/>
            <Route path={PagePath.forbidden} index element={<Forbidden/>}/>

            <Route index element={<Navigate to={PagePath.home} replace />}/>
            <Route path={PagePath.login} element={<Login/>}/>
            <Route path={PagePath.home} index element={<Home/>}/>
            <Route path={PagePath.profile} index element={<Profile/>}/>
            <Route path={PagePath.schedule} index element={<Schedule/>}/>
            <Route path={PagePath.students} index element={<Students/>}/>

        </Routes>
    )
}