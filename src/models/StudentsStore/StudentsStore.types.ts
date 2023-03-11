import {UserInfo} from "../../api/services/AuthService/AuthService.types";

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

export interface Lesson {
    id: string;
    students: Student[];
    teacher: UserInfo[];
    course: Course;
    group: Group;
    subject: Subject;
}