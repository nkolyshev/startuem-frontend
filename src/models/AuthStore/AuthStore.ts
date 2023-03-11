import {autorun, flow, makeAutoObservable} from "mobx";
import {LoginPayload, RoleVariant} from "./AuthStore.types";
import {AuthService} from "../../api/services/AuthService/AuthService";
import {LoginResponse} from "../../api/services/AuthService/AuthService.types";
import {LocalStorage} from "../../localStorage/LocalStorage";

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

    public isUserAuth: boolean = false;
    public isAccessTokenChecked: boolean = false;
    public isRefreshTokenChecked: boolean = false;
    public uid: string | null = null;
    public role: RoleVariant | null = null;
    public fio: string | null = null;
    public accessToken: string | null;
    public error: string | null = null;
    private authService: AuthService | null = null;

    loginUser = flow(function* (this: AuthStore, payload: LoginPayload){
        try {
            const result: LoginResponse = yield this?.authService?.login(payload);
            const { user: { role, uid, fio }, accessToken } = result;
            this.uid = uid;
            this.role = role;
            this.fio = fio;
            this.isUserAuth = true;
            this.accessToken = accessToken;
        } catch (error) {
            this.error = "error"
        }
    })

    validateAccessToken = flow(function* (this: AuthStore){
        try {
            const result: LoginResponse = yield this?.authService?.validateToken();
            const { user: { role, uid, fio }, accessToken } = result;
            this.uid = uid;
            this.role = role;
            this.fio = fio;
            this.isAccessTokenChecked = true;
            this.isUserAuth = true;
            this.accessToken = accessToken;
        } catch (error) {
            this.isAccessTokenChecked = true;
            this.error = "error"
        }
    })

    validateRefreshToken = flow(function* (this: AuthStore){
        try {
            const result: LoginResponse = yield this?.authService?.refreshToken();
            const { user: { role, uid, fio }, accessToken } = result;
            this.uid = uid;
            this.role = role;
            this.fio = fio;
            this.isAccessTokenChecked = true;
            this.isRefreshTokenChecked = true;
            this.isUserAuth = true;
            this.accessToken = accessToken;
        } catch (error) {
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
        this.isAccessTokenChecked = false;
        this.isRefreshTokenChecked = false;
    })

    setIsUserAuth(isAuth: boolean) {
        this.isUserAuth = isAuth;
    }

}