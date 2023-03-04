import {makeAutoObservable} from "mobx";
import {Course, Group, Subject} from "./StudentsStore.types";

export interface StudentsFormValues {
    course: string;
    group: string;
    subject: string;
}

export interface IStudentsStore {
    courses: Course[] | null;
    groups: Group[] | null;
    subjects: Subject[] | null;
    fetchCourses(): Promise<void>
    submitStudentsForm(values: StudentsFormValues): Promise<void>
}

export class StudentsStore implements IStudentsStore {

    constructor() {
        makeAutoObservable(this);
    }

    public courses: Course[] | null = null;
    public groups: Group[] | null = null;
    public subjects: Subject[] | null = null;



    public async fetchCourses(): Promise<void> {
        // TODO: сделать запрос на бэк
        this.courses = [
            {
                id: 'id-001',
                value: '1',
            },
            {
                id: 'id-002',
                value: '2',
            },
            {
                id: 'id-003',
                value: '3',
            },
            {
                id: 'id-004',
                value: '4',
            }
        ];
    }

    public async fetchGroups(courseId: string): Promise<void> {
        // TODO: сделать запрос на бэк
        this.groups = [
            {
                id: 'id-1',
                value: 'МБИ-121',
            },
            {
                id: 'id-2',
                value: 'МБА-121',
            },
            {
                id: 'id-3',
                value: 'МВА-1322',
            },
            {
                id: 'id-4',
                value: 'МБА-1221',
            }
        ];
    }

    public async fetchSubjects(groupId: string): Promise<void> {
        // TODO: сделать запрос на бэк
        this.subjects = [
            {
                id: 'id-01',
                value: 'СПО',
            },
            {
                id: 'id-02',
                value: 'Математическая логика',
            },
            {
                id: 'id-03',
                value: 'Философия',
            },
            {
                id: 'id-04',
                value: 'История',
            }
        ];
    }

    public async submitStudentsForm(values: StudentsFormValues): Promise<void> {
        // TODO: сделать запрос на бэк
        alert(JSON.stringify(values, null, 4));
    }


}