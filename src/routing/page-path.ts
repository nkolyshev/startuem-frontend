import {PageName} from "./page-name";

export const PagePath: Record<PageName, string> = {
    [PageName.Home]: '/home',
    [PageName.Profile]: '/profile',
    [PageName.Students]: '/students',
    [PageName.Attendance]: '/attendance',
    [PageName.Login]: '/login',
    [PageName.Forbidden]: '/forbidden',
    [PageName.UserManagement]: '/userManagement',
}