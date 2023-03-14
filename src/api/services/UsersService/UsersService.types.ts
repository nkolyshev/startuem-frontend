import {UserInfo} from "../AuthService/AuthService.types";
import {ManagementMode} from "../../../models/UserManagmentStore/UserManagementStore.types";
import {RoleVariant} from "../../../models/AuthStore/AuthStore.types";

export type CheckUserUIDPayload = {
    userUID: string
};

export type CheckUserUIDResponse = {
    mode: ManagementMode.CreateUser | ManagementMode.UpdateUser;
    userInfo: UserInfo;
};

export type GetAllUsersResponse = UserInfo[];

export type GetAllUsersByGroupIdResponse = UserInfo[];

export type EditUserPayload = {
    readonly uid: string | null;
    readonly email: string | null;
    readonly fio: string | null;
    readonly role: RoleVariant | null;
    readonly password: string | null;
    readonly courseId: string | null;
    readonly groupId: string | null;
}
