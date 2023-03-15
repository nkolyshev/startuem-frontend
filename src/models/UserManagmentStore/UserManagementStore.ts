import {flow, makeAutoObservable} from "mobx";
import {ManagementMode} from "./UserManagementStore.types";
import {UsersService} from "../../api/services/UsersService/UsersService";
import {
    CheckUserUIDPayload,
    CheckUserUIDResponse,
    EditUserPayload
} from "../../api/services/UsersService/UsersService.types";
import {CoursesService} from "../../api/services/CoursesService/CoursesService";
import {GroupsService} from "../../api/services/GroupsService/GroupsService";
import {Course, Group} from "../StudentsStore/StudentsStore.types";
import {UserInfo} from "../../api/services/AuthService/AuthService.types";
import {AuthService} from "../../api/services/AuthService/AuthService";
import {RoleVariant} from "../AuthStore/AuthStore.types";

export class UserManagementStore {
    constructor() {
        makeAutoObservable(this);
    }

    public courses: Course[] | null = null;
    public groups: Group[] | null = null;
    public managementMode: ManagementMode = ManagementMode.CheckUID;
    private usersService: UsersService = new UsersService();
    private coursesService: CoursesService = new CoursesService();
    private groupsService: GroupsService = new GroupsService();
    private authService: AuthService = new AuthService();
    public userInfo: UserInfo | null = null;
    public userUID: string | null = null;
    public currentUserUID: string | null = null;

    public fetchCourses = flow(function* (this: UserManagementStore){
        this.courses = yield this.coursesService.getAllCourses();
    })

    public fetchGroups = flow(function* (this: UserManagementStore, courseId: string){
        this.groups = yield this.groupsService.getAllGroupsByCourseId({
            courseId,
        });
    })

    public checkUserUID = flow(function* (this: UserManagementStore, payload: CheckUserUIDPayload) {
        try {
            const res: CheckUserUIDResponse = yield this.usersService.checkUserUID(payload);
            this.managementMode = res.mode;
            if (res?.userInfo) {
                this.userInfo = res.userInfo;
            }
            this.userUID = payload.userUID;
        }
        catch (_err) {
            this.managementMode = ManagementMode.CheckUID;
        }
    })

    public editUser = flow(function* (this: UserManagementStore, payload: EditUserPayload) {
        try {
            if (this.managementMode === ManagementMode.UpdateUser) {
                yield this.usersService.updateUser({
                    ...payload,
                    courseId: payload?.role === RoleVariant.Student ? payload?.courseId : '',
                    groupId: payload?.role === RoleVariant.Student ? payload?.groupId : '',
                    currentUserUID: this.userUID ?? '',
                });
            }
            if (this.managementMode === ManagementMode.CreateUser) {
                yield this.authService.register({
                    ...payload,
                    courseId: payload?.role === RoleVariant.Student ? payload?.courseId : '',
                    groupId: payload?.role === RoleVariant.Student ? payload?.groupId : '',
                });
            }
            this.userUID = null;
            this.currentUserUID = null;
            this.courses = null;
            this.groups = null;
            this.userInfo = null;
            this.managementMode = ManagementMode.CheckUID;
        }
        catch (_err) {}
    })

    public setCurrentUserUID(userUID: string) {
        this.currentUserUID = userUID;
    }

    public clearAll() {
        this.userUID = null;
        this.currentUserUID = null;
        this.courses = null;
        this.groups = null;
        this.userInfo = null;
        this.managementMode = ManagementMode.CheckUID;
    }

}