import {autorun, flow, makeAutoObservable} from "mobx";
import {LoginPayload, RoleVariant} from "./AuthStore.types";
import {AuthService} from "../../api/services/AuthService/AuthService";
import {LoginResponse} from "../../api/services/AuthService/AuthService.types";
import {LocalStorage} from "../../localStorage/LocalStorage";
import {Course, Group} from "../StudentsStore/StudentsStore.types";

export class AuthStore {

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.authService = new AuthService();
        this.accessToken = !!LocalStorage?.accessToken ? LocalStorage.accessToken : null;

        autorun(() => {
            if (!!this.accessToken) {
                LocalStorage.setAccessToken(this.accessToken)
            }
        })
    }

    public isAccessTokenLoading: boolean = false;
    public isRefreshTokenLoading: boolean = false;
    public isUserAuth: boolean = false;
    public isAccessTokenChecked: boolean = false;
    public isRefreshTokenChecked: boolean = false;
    public uid: string | null = null;
    public role: RoleVariant | null = null;
    public fio: string | null = null;
    public email: string | null = null;
    public group: Group | null = null;
    public course: Course | null = null;
    public accessToken: string | null;
    public error: string | null = null;
    public loginError: string | null = null;
    private authService: AuthService | null = null;

    loginUser = flow(function* (this: AuthStore, payload: LoginPayload){
        try {
            const result: LoginResponse = yield this?.authService?.login(payload);
            const { user: { role, uid, fio, email, group, course }, accessToken } = result;
            this.uid = uid;
            this.role = role;
            this.fio = fio;
            this.email = email;
            this.group = group;
            this.course = course;
            this.isUserAuth = true;
            this.accessToken = accessToken;
            this.loginError = null;
        } catch (error) {
            this.loginError = 'Неверный email или пароль!';
        }
    })

    validateAccessToken = flow(function* (this: AuthStore){
        try {
            this.isAccessTokenLoading = true;
            const result: LoginResponse = yield this?.authService?.validateToken();
            this.isAccessTokenLoading = false;
            const { user: { role, uid, fio, email, group, course }, accessToken } = result;
            this.uid = uid;
            this.role = role;
            this.fio = fio;
            this.email = email;
            this.group = group;
            this.course = course;
            this.isAccessTokenChecked = true;
            this.isUserAuth = true;
            this.accessToken = accessToken;
        } catch (error) {
            this.isAccessTokenLoading = false;
            this.isAccessTokenChecked = true;
            this.error = "error"
        }
    })

    validateRefreshToken = flow(function* (this: AuthStore){
        try {
            this.isRefreshTokenLoading = true;
            const result: LoginResponse = yield this?.authService?.refreshToken();
            this.isRefreshTokenLoading = false;
            const { user: { role, uid, fio, email, group, course }, accessToken } = result;
            this.uid = uid;
            this.role = role;
            this.fio = fio;
            this.email = email;
            this.group = group;
            this.course = course;
            this.isAccessTokenChecked = true;
            this.isRefreshTokenChecked = true;
            this.isUserAuth = true;
            this.accessToken = accessToken;
        } catch (error) {
            this.isRefreshTokenLoading = false;
            this.isAccessTokenChecked = true;
            this.isRefreshTokenChecked = true;
            this.error = "error"
        }
    })

    logoutUser = flow(function* (this: AuthStore) {
        LocalStorage.clearAccessToken();
        yield this?.authService?.logout();
        this.accessToken = null
        this.isUserAuth = false;
        this.uid = null;
        this.role = null;
        this.fio = null;
        this.email = null;
        this.error = null;
        this.loginError = null;
        this.isAccessTokenChecked = false;
        this.isRefreshTokenChecked = false;
    })

    setIsUserAuth(isAuth: boolean) {
        this.isUserAuth = isAuth;
    }

}