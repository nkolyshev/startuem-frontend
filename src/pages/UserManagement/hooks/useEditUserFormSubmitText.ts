import {ManagementMode} from "../../../models/UserManagmentStore/UserManagementStore.types";
import {useMemo} from "react";

export const useEditUserFormSubmitText = (managementMode: ManagementMode | undefined) => {
    return useMemo(() => {
        switch (managementMode) {
            case ManagementMode.UpdateUser:
                return 'Обновить данные пользователя';
            case ManagementMode.CreateUser:
                return 'Зарегистрировать пользователя';
            default:
                return 'Зарегистрировать пользователя';
        }
    }, [managementMode])
}