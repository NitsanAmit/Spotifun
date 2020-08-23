import React, {useEffect} from 'react';
import {useState} from "react";
import {AppStep} from "./models/app-consts";
import {LoginForm} from "./login-form";

export const Spotifun: React.FunctionComponent = (props => {
    const [step, setStep] = useState<AppStep>(AppStep.Login);
    const [token, setToken] = useState<string>( window.sessionStorage.getItem(TOKEN_STORAGE_KEY) || '');

    useEffect(() => {
        if(token) return;
        const _token = hash.access_token;
        if (_token) {
            window.sessionStorage.setItem(TOKEN_STORAGE_KEY, _token);
            setToken(_token);
        }
    });

    return (
        <div style={{alignItems: "center", textAlign: "center"}} >
            {
                step === AppStep.Login && <LoginForm/>
            }
        </div>
    )
})

const hash: { access_token: string } = window.location.hash.substring(1).split("&").reduce(function(hashParams, item) {
    if (item) {
        const parts = item.split("=");
        // @ts-ignore
        hashParams[parts[0]] = decodeURIComponent(parts[1]);
    }
    return hashParams;
}, { access_token : "" });

window.location.hash = "";



const TOKEN_STORAGE_KEY = "token";