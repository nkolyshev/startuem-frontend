export enum RoleVariant {
    SuperAdmin = 'superAdmin',
    Admin = 'admin',
    Teacher = 'teacher',
    Student = 'student',
}

export type LoginPayload = {
    email: string;
    password: string;
}