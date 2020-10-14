import {action, observable} from "mobx";
import {LoginConsts} from "../models/app-consts";

export class AuthService {

    @observable
    token: string = '';

    userId: string = '';
    expirationTime: Date | undefined;

    private refreshToken: string = '';

    constructor() {
        const storedToken = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
        const storedRefreshToken = window.sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
        if (storedToken && storedRefreshToken) {
            this.token = storedToken;
            this.refreshToken = storedRefreshToken;
        } else if (hash?.code) {
            this.getAuthToken(hash.code);
        }
    }

    private getAuthToken(code: string) {
        const {redirectUri, clientId, clientSecret} = LoginConsts;
        fetch(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(redirectUri)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')),
                },
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("auth unsuccessful");
            })
            .then((response: AuthResponse) => {
                this.token = response.access_token;
                this.refreshToken = response.refresh_token;
                window.sessionStorage.setItem(TOKEN_STORAGE_KEY, this.token);
                window.sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, this.refreshToken);
                window.history.pushState({}, document.title, window.location.pathname);
                this.saveExpirationTime(response.expires_in);
                setTimeout(action(() => {
                    this.refreshAuthToken();
                }), response.expires_in * 1000);
            });
    }


    refreshAuthToken = () => {
        if (this.expirationTime && new Date().getTime() < this.expirationTime.getTime()) {
            return Promise.resolve();
        }
        const {clientId, clientSecret} = LoginConsts;
        return fetch(`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${encodeURIComponent(this.refreshToken)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')),
                },
            })
            .then(response => response.json())
            .then((response: AuthResponse) => {
                if (response.error) return;
                this.token = response.access_token;
                window.sessionStorage.setItem(TOKEN_STORAGE_KEY, this.token);
                this.saveExpirationTime(response.expires_in);
                setTimeout(action(() => {
                    this.refreshAuthToken();
                }), response.expires_in * 1000);
            });
    };

    private saveExpirationTime = (expiresIn: number) => {
        const currentTime = new Date();
        currentTime.setMilliseconds(currentTime.getMilliseconds() + (expiresIn * 1000));
        this.expirationTime = currentTime;
    };

    saveUserId(userId: string){
        this.userId = userId;
    }
}

interface AuthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    error?: string;
}

const hash: { code: string; } = window.location.search.substring(1).split("&").reduce((hashParams, item) => {
    if (item) {
        const parts = item.split("=");
        // @ts-ignore
        hashParams[parts[0]] = decodeURIComponent(parts[1]);
    }
    return hashParams;
}, {code: ""});


const TOKEN_STORAGE_KEY = "auth-token";
const REFRESH_TOKEN_STORAGE_KEY = "refresh-token";