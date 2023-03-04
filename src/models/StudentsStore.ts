import {makeAutoObservable} from "mobx";
import {Course, Group, Student, Subject} from "./StudentsStore.types";

export interface StudentsFormValues {
    course: string;
    group: string;
    subject: string;
}

export interface IStudentsStore {
    courses: Course[] | null;
    groups: Group[] | null;
    subjects: Subject[] | null;
    studentsFormValues: StudentsFormValues | null;
    fetchCourses(): Promise<void>
    setStudentsFormValues(values: StudentsFormValues): void;
    fetchStudents(): Promise<void>;
    deleteStudentById(id: string): Promise<void>;
    addStudent(student: Student): Promise<void>;
    clearStudents(): void;
}

export class StudentsStore implements IStudentsStore {

    constructor() {
        makeAutoObservable(this);
    }

    public courses: Course[] | null = null;
    public groups: Group[] | null = null;
    public subjects: Subject[] | null = null;
    public students: Student[] | null = null;
    public studentsFormValues: StudentsFormValues | null = null;



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

    setStudentsFormValues(values: StudentsFormValues): void {
        this.studentsFormValues = values;
    }

    public async fetchStudents(): Promise<void> {

        //TODO: this.studentsFormValues использовать для запроса на бэк

        this.students = [
            {
                id: 'id-1',
                fullName: 'Тестов Тест Тестович',
            },
            {
                id: 'id-2',
                fullName: 'Попов Поп Попович',
            },
            {
                id: 'id-3',
                fullName: 'Миронов Мирон Миронович',
            },
            {
                id: 'id-4',
                fullName: 'Иванов Иван Иванович',
            },
            {
                id: 'id-5',
                fullName: 'Афонина Арина Витальевна',
            },
            {
                id: 'id-6',
                fullName: 'Коковихина Марина Леонидовна',
            },
        ]
    }

    public async deleteStudentById(studentId: string): Promise<void> {
        this.students = this.students ? this.students?.filter(({id}) => id !== studentId) : null;
    }

    public async addStudent(student: Student): Promise<void> {
        this.students = [...(this.students ?? []), student];
    }

    public clearStudents() {
        this.students = null;
    }

}