import {ManagementMode} from "../../../models/UserManagmentStore/UserManagementStore.types";
import {useMemo} from "react";

export const useUserManagementTitle = (managementMode: ManagementMode | undefined) => {
    return useMemo(() => {
        switch (managementMode) {
            case ManagementMode.UpdateUser:
                return 'Обновление пользователя';
            case ManagementMode.CreateUser:
                return 'Создание пользователя';
            default:
                return 'Управление пользователем';
        }
    }, [managementMode])
}