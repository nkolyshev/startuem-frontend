import {PageName} from "./page-name";

export const PagePath: Record<PageName, string> = {
    [PageName.Home]: '/home',
    [PageName.Profile]: '/profile',
    [PageName.Schedule]: '/schedule',
    [PageName.Students]: '/students',
    [PageName.Login]: '/login',
    [PageName.Forbidden]: '/forbidden',
}