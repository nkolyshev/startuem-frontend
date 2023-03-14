import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {PagePath} from "./page-path";
import {Home} from "../pages/Home/Home";
import {Profile} from "../pages/Profile/Profile";
import {Login} from "../pages/Login/Login";
import {NotFound} from "../pages/NotFound/NotFound";
import {Students} from "../pages/Students/Students";
import {Forbidden} from "../pages/Forbidden/Forbidden";
import {useAuthStore} from "../context/Auth.context";
import {RoleVariant} from "../models/AuthStore/AuthStore.types";
import {Attendance} from "../pages/Attendance/Attendance";
import {UserManagement} from "../pages/UserManagement/UserManagement";

export const RootRouter: React.FC = () => {

    const authStore = useAuthStore();

    return (
        <Routes>

            <Route path={'*'} element={<NotFound/>}/>
            <Route path={PagePath.forbidden} index element={<Forbidden/>}/>
            <Route index element={<Navigate to={PagePath.home} replace />}/>
            <Route path={PagePath.login} element={<Login/>}/>
            <Route path={PagePath.home} index element={<Home/>}/>
            <Route path={PagePath.profile} index element={<Profile/>}/>
            {
                [RoleVariant.Teacher].includes(authStore?.role as RoleVariant)
                    ? <Route path={PagePath.students} index element={<Students/>}/>
                    : <Route path={PagePath.students} index element={<Forbidden/>}/>
            }
            {
                [RoleVariant.Student].includes(authStore?.role as RoleVariant)
                    ? <Route path={PagePath.attendance} index element={<Attendance/>}/>
                    : <Route path={PagePath.attendance} index element={<Forbidden/>}/>
            }
            {
                [RoleVariant.Admin, RoleVariant.SuperAdmin].includes(authStore?.role as RoleVariant)
                    ? <Route path={PagePath.userManagement} index element={<UserManagement/>}/>
                    : <Route path={PagePath.userManagement} index element={<Forbidden/>}/>
            }
        </Routes>
    )
}