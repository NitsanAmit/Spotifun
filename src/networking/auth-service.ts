import {observable} from "mobx";
import {loginUrl} from "../login-page/login-form";

export class AuthService {

    @observable
    token: string = '';

    userId: string = '';
    expirationTime: Date | undefined;

    private refreshToken: string = '';

    constructor() {
        const storedToken = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
        if (storedToken && storedToken !== "") {
            const expiration = window.sessionStorage.getItem(EXPIRATION_STORAGE_KEY);
            if (!expiration || new Date().getTime() > parseInt(expiration)) {
                window.sessionStorage.setItem(TOKEN_STORAGE_KEY, "");
            } else {
                this.token = storedToken;
                return;
            }
        }
        if (hash.access_token) {
            this.token = hash.access_token;
            window.sessionStorage.setItem(TOKEN_STORAGE_KEY, this.token);
            hash.expires_in && this.saveExpirationTime(hash.expires_in);
        }
    }

    refreshAuthToken = async () => {
        window.location.replace(loginUrl);
    };

    private saveExpirationTime = (expiresIn: number) => {
        const currentTime = new Date();
        currentTime.setMilliseconds(currentTime.getMilliseconds() + (expiresIn * 1000));
        window.sessionStorage.setItem(EXPIRATION_STORAGE_KEY, currentTime.getTime().toString());
        this.expirationTime = currentTime;
    };

    saveUserId(userId: string) {
        this.userId = userId;
    }
}

interface AuthResponse {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
    error?: string;
}

const hash: AuthResponse = window.location.hash.substring(1).split("&").reduce((hashParams, item) => {
    if (item) {
        const parts = item.split("=");
        // @ts-ignore
        hashParams[parts[0]] = decodeURIComponent(parts[1]);
    }
    return hashParams;
}, {});


const TOKEN_STORAGE_KEY = "auth-token";
const EXPIRATION_STORAGE_KEY = "expires_at";