import {RoleVariant} from "./AuthStore.types";

export const RoleNames = {
    [RoleVariant.SuperAdmin]: 'Супер-админ',
    [RoleVariant.Admin]: 'Админ',
    [RoleVariant.Teacher]: 'Преподаватель',
    [RoleVariant.Student]: 'Студент',
}