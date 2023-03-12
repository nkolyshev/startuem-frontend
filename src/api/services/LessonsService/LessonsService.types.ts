import {Lesson} from "../../../models/StudentsStore/StudentsStore.types";

export type GetAllLessonsResponse = Lesson[];

export type CreateLessonPayload = {
    teacherUID: string;
    courseId: string;
    groupId: string;
    subjectId: string;
};

export type AddStudentToLessonPayload = {
    studentUID: string;
    lessonId: string;
};

export type RemoveStudentToLessonPayload = {
    studentUID: string;
    lessonId: string;
};

export type GetAllLessonsWithFiltersPayload = {
    studentUID: string;
    dateStart?: string;
    dateEnd?: string;
    subjectId?: string;
};

export type CreateLessonResponse = Lesson;
export type  AddStudentToLessonResponse = Lesson;
export type  RemoveStudentToLessonResponse = Lesson;
export type  GetAllLessonsWithFiltersResponse = Lesson[];
