import {Lesson} from "../../../models/StudentsStore/StudentsStore.types";
import {UserInfo} from "../AuthService/AuthService.types";

export type GetAllUsersResponse = UserInfo[];

export type GetAllUsersByGroupIdResponse = UserInfo[];

export type CreateLessonResponse = Lesson;
