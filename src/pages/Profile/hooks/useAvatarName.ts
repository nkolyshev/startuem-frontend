import {RoleNames} from "../../../models/AuthStore/AuthStore.constants";

export const useAvatarName = (fio: string | undefined | null) => {
    if (fio) {
        return fio?.[0].toLowerCase();
    }
    return '?'
}