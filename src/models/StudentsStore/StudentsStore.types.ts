import {UserInfo} from "../../api/services/AuthService/AuthService.types";

export enum StudentStatus {
    Active = 'active',
    Inactive = 'inactive',
}

export interface Course {
    id: string;
    name: string;
}

export interface Group {
    id: string;
    name: string;
}

export interface Subject {
    id: string;
    name: string;
}

export interface Student {
    uid: string;
    fio: `${string} ${string} ${string}`;
}

export interface StudentFullInfo extends Student {
    status: StudentStatus;
}

export interface Lesson {
    id: string;
    students: Student[];
    teacher: UserInfo;
    course: Course;
    group: Group;
    subject: Subject;
    created_at: string;
}

export interface LessonWithDate {
    id: string;
    students: Student[];
    teacher: UserInfo;
    course: Course;
    group: Group;
    subject: Subject;
    date: string;
}