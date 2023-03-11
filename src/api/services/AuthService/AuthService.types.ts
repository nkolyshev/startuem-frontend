import {RoleVariant} from "../../../models/AuthStore/AuthStore.types";

export type UserInfo = {
    uid: string;
    role: RoleVariant;
    fio: string;
}

export type LoginBody = {
    email: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
    user: UserInfo;
}

export type RegisterBody = {
    email: string;
    password: string;
    name: string;
}
export type RegisterResponse = {
    accessToken: string;
    user: UserInfo;
}

export type ValidateTokenResponse = {
    accessToken: string;
    user: UserInfo;
}

export type RefreshTokenResponse = {
    accessToken: string;
    user: UserInfo;
}
