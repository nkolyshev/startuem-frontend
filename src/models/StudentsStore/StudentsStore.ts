import {flow, makeAutoObservable} from "mobx";
import {Course, Group, Lesson, Student, Subject} from "./StudentsStore.types";
import {CoursesService} from "../../api/services/CoursesService/CoursesService";
import {GroupsService} from "../../api/services/GroupsService/GroupsService";
import {SubjectsService} from "../../api/services/SubjectsService/SubjectsService";
import {UsersService} from "../../api/services/UsersService/UsersService";
import {LessonsService} from "../../api/services/LessonsService/LessonsService";
import {CreateLessonPayload} from "../../api/services/LessonsService/LessonsService.types";

export interface StudentsFormValues {
    course: string;
    group: string;
    subject: string;
}

export class StudentsStore {

    constructor() {
        makeAutoObservable(this);
        this.coursesService = new CoursesService();
        this.groupsService = new GroupsService();
        this.subjectsService = new SubjectsService();
        this.usersService = new UsersService();
        this.lessonsService = new LessonsService();
    }

    public courses: Course[] | null = null;
    public groups: Group[] | null = null;
    public subjects: Subject[] | null = null;
    public students: Student[] | null = null;
    public lesson: Lesson | null = null;
    private coursesService: CoursesService;
    private groupsService: GroupsService;
    private subjectsService: SubjectsService;
    private usersService: UsersService;
    private lessonsService: LessonsService;



    fetchCourses = flow(function* (this: StudentsStore){
        this.courses = yield this.coursesService.getAllCourses();
    })

    fetchGroups = flow(function* (this: StudentsStore, courseId: string){
        this.groups = yield this.groupsService.getAllGroupsByCourseId({
            courseId,
        });
    })

    fetchSubjects = flow(function* (this: StudentsStore, groupId: string){
        this.subjects = yield this.subjectsService.getAllSubjectsByGroupId({
            groupId,
        });
    })

    createLesson = flow(function* (this: StudentsStore, payload: CreateLessonPayload) {
        this.lesson = yield this.lessonsService.createLesson(payload);
    })

    fetchStudentsByGroup = flow(function* (this: StudentsStore, groupId: string){
        this.students = yield this.usersService.getAllUsersByGroupId({
            groupId,
        });
    })

    public async deleteStudentById(studentId: string): Promise<void> {
        this.students = this.students ? this.students?.filter(({uid}) => uid !== studentId) : null;
    }

    public async addStudent(student: Student): Promise<void> {
        this.students = [...(this.students ?? []), student];
    }

    public clearStudents() {
        this.students = null;
    }

}