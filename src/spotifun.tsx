import React, {useEffect, useState} from 'react';
import {AppStep} from "./models/app-consts";
import {LoginForm} from "./login-form";
import {GenrePicker} from "./genre-selection/genre-picker";
import {SpotifyApi} from "./spotifyApi";
import {GenreStore} from "./genre-selection/genre-store";

export const Spotifun: React.FunctionComponent = (props => {
    const [step, setStep] = useState<AppStep>(AppStep.Login);
    const [token, setToken] = useState<string>(window.sessionStorage.getItem(TOKEN_STORAGE_KEY) || '');
    const [genreStore] = useState<GenreStore>(new GenreStore());
    const [spotifyApi, setSpotifyApi] = useState<SpotifyApi>();

    useEffect(() => {
        if (token) return;
        const _token = hash.access_token;
        if (_token) {
            window.sessionStorage.setItem(TOKEN_STORAGE_KEY, _token);
            setToken(_token);
        }
    });

    useEffect(() => {
        if (token) {
            setSpotifyApi(new SpotifyApi(token));
            setStep(AppStep.GenresSelection); //TODO solve edge cases (token refresh, token present on useState init)
        }
    }, [token]);


    return (
        <div style={{alignItems: "center", textAlign: "center"}}>
            {
                step === AppStep.Login && <LoginForm/>
            }
            {
                step === AppStep.GenresSelection && <GenrePicker genreStore={genreStore}/>
            }
        </div>
    )
})

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