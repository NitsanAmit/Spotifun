import {action, observable} from "mobx";
import {LoginConsts} from "./models/app-consts";

export class AuthService {

    constructor() {
        const storedToken = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
        const storedRefreshToken = window.sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
        if(storedToken && storedRefreshToken){
            this.token = storedToken;
            this.refreshToken = storedRefreshToken;
        } else if (hash?.code) {
            this.getAuthToken(hash.code);
        }
    }

    @observable
    token: string = '';

    private refreshToken: string = '';

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
                if(response.status === 200){
                    return response.json();
                }
                throw "Error";
            })
            .then((response: AuthResponse) => {
                this.token = response.access_token;
                this.refreshToken = response.refresh_token;
                window.sessionStorage.setItem(TOKEN_STORAGE_KEY, this.token);
                window.sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, this.token);
                setTimeout(action(() => {
                    this.refreshAuthToken();
                }), response.expires_in * 1000);
            });
    }


    refreshAuthToken = () => {
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
                this.token = response.access_token;
                window.sessionStorage.setItem(TOKEN_STORAGE_KEY, this.token);
                setTimeout(action(() => {
                    this.refreshAuthToken();
                }), response.expires_in * 1000);
            });
    };
}

interface AuthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

const hash: { code: string; } = window.location.search.substring(1).split("&").reduce((hashParams, item) => {
    if (item) {
        const parts = item.split("=");
        // @ts-ignore
        hashParams[parts[0]] = decodeURIComponent(parts[1]);
    }
    return hashParams;
}, {code: ""});

window.location.hash = "";


const TOKEN_STORAGE_KEY = "auth-token";
const REFRESH_TOKEN_STORAGE_KEY = "refresh-token";