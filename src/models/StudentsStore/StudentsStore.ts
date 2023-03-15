import {autorun, flow, makeAutoObservable} from "mobx";
import {Course, Group, Lesson, Student, StudentFullInfo, StudentStatus, Subject} from "./StudentsStore.types";
import {CoursesService} from "../../api/services/CoursesService/CoursesService";
import {GroupsService} from "../../api/services/GroupsService/GroupsService";
import {SubjectsService} from "../../api/services/SubjectsService/SubjectsService";
import {UsersService} from "../../api/services/UsersService/UsersService";
import {LessonsService} from "../../api/services/LessonsService/LessonsService";
import {CreateLessonPayload} from "../../api/services/LessonsService/LessonsService.types";

export interface StudentsFormValues {
    readerUID: string;
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

        autorun(() => {
            if (this.studentsByGroup && this?.lesson?.students) {
                this.students = this.studentsByGroup.map(student => {
                    return {
                        ...student,
                        status: this?.lesson?.students?.find(lessonStudent => lessonStudent.uid === student.uid) ? StudentStatus.Active : StudentStatus.Inactive,
                    }
                }).sort((prevStudent, nextStudent) => {
                    return prevStudent.status === StudentStatus.Inactive ? 1 : -1;
                })
            }
        })
    }

    public readerUID: string | null = null;
    public courses: Course[] | null = null;
    public groups: Group[] | null = null;
    public subjects: Subject[] | null = null;
    public students: StudentFullInfo[] | null = null;
    public studentsByGroup: Student[] | null = null;
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

    createLesson = flow(function* (this: StudentsStore, { readerUID, ...payload }: CreateLessonPayload & { readerUID: string }) {
        this.readerUID = readerUID;
        this.lesson = yield this.lessonsService.createLesson(payload);
    })

    fetchStudentsByGroup = flow(function* (this: StudentsStore, groupId: string){
        this.studentsByGroup = yield this.usersService.getAllUsersByGroupId({
            groupId,
        });
    })

    addStudentToLesson = flow(function* (this: StudentsStore, studentUID: string) {
        this.lesson = yield this.lessonsService.addStudentToLesson({
            lessonId: this?.lesson?.id ?? '',
            studentUID,
        });
    })

    deleteStudentById = flow(function* (this: StudentsStore, studentUID: string) {
        this.lesson = yield this.lessonsService.removeStudentFromLesson({
            lessonId: this?.lesson?.id ?? '',
            studentUID,
        });
    })

    public clearStudents() {
        this.readerUID = null;
        this.students = null;
        this.studentsByGroup = null;
        this.lesson = null;
        this.groups = null;
        this.subjects = null;
        this.courses = null;
    }

}