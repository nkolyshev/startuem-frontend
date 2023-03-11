import {ACCESS_TOKEN_KEY} from "./LocalStorage.constants";

export class LocalStorage {
    static get accessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    static setAccessToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
    static clearAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
}