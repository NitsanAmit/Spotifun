import {computed} from "mobx";

export class AuthService{

    constructor() {
        let storedToken = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
        if(storedToken){
            this.token = storedToken;
        }else if(hash){
            this.token = hash.access_token;
            window.sessionStorage.setItem(TOKEN_STORAGE_KEY, this.token);
        }
    }

    token: string = '';

    @computed
    get hasToken(): boolean {
        return !!this.token;
    }

    onTokenRevoken = () => {
        window.sessionStorage.setItem(TOKEN_STORAGE_KEY, '');
        this.token = '';
    }
}

const hash: { access_token: string } = window.location.hash.substring(1).split("&").reduce(function (hashParams, item) {
    if (item) {
        const parts = item.split("=");
        // @ts-ignore
        hashParams[parts[0]] = decodeURIComponent(parts[1]);
    }
    return hashParams;
}, {access_token: ""});

window.location.hash = "";


const TOKEN_STORAGE_KEY = "token";