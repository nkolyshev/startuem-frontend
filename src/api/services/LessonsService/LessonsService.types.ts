import {Lesson} from "../../../models/StudentsStore/StudentsStore.types";

export type GetAllLessonsResponse = Lesson[];

export type CreateLessonPayload = {
    teacherUID: string;
    courseId: string;
    groupId: string;
    subjectId: string;
};

export type CreateLessonResponse = Lesson;
