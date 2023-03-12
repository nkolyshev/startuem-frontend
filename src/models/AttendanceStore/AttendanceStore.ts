import {autorun, flow, makeAutoObservable} from "mobx";
import {Lesson, LessonWithDate, Subject} from "../StudentsStore/StudentsStore.types";
import {GetAllLessonsWithFiltersPayload} from "../../api/services/LessonsService/LessonsService.types";
import {LessonsService} from "../../api/services/LessonsService/LessonsService";
import { format } from 'date-fns'
import {SubjectsService} from "../../api/services/SubjectsService/SubjectsService";

export class AttendanceStore {
    constructor() {
        makeAutoObservable(this);
        autorun(() => {
            if (this.lessons) {
                this.lessonsWithDate = this.lessons.map(lesson => {
                    return {
                        ...lesson,
                        date: lesson.created_at ? format(new Date(lesson.created_at), 'dd.MM.yyyy H:mm') : 'Неизвестно',
                    }
                })
            }
        })
    }

    private lessonsService: LessonsService = new LessonsService();
    private subjectsService: SubjectsService = new SubjectsService();
    private lessons: Lesson[] | null = null;
    public lessonsWithDate: LessonWithDate[] | null = null;
    public subjects: Subject[] | null = null;

    getAllLessonsWithFilters = flow(function* (this: AttendanceStore, payload: GetAllLessonsWithFiltersPayload) {
        this.lessons = yield this.lessonsService.getAllLessonsWithFilters(payload);
    })

    fetchSubjects = flow(function* (this: AttendanceStore, groupId: string){
        this.subjects = yield this.subjectsService.getAllSubjectsByGroupId({
            groupId,
        });
    })

}