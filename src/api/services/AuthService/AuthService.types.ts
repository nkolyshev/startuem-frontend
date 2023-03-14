import {RoleVariant} from "../../../models/AuthStore/AuthStore.types";
import {Course, Group} from "../../../models/StudentsStore/StudentsStore.types";

export type UserInfo = {
    uid: string;
    role: RoleVariant;
    fio: string;
    email: string;
    course: Course;
    group: Group;
}

export type LoginBody = {
    email: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
    user: UserInfo;
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
