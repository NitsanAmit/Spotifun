import React, {useEffect, useState} from 'react';
import {AppStep} from "./models/app-consts";
import {LoginForm} from "./login-form";
import {GenrePicker} from "./genre-selection/genre-picker";
import {SpotifyApi} from "./spotifyApi";
import {GenreStore} from "./genre-selection/genre-store";
import {AuthService} from "./auth-service";
import {observer} from "mobx-react";

export const Spotifun: React.FunctionComponent = observer((() => {

    const [authService] = useState<AuthService>(new AuthService());
    const [step, setStep] = useState<AppStep>(AppStep.GenresSelection);
    const [genreStore] = useState<GenreStore>(new GenreStore());
    const [spotifyApi, setSpotifyApi] = useState<SpotifyApi>();

    useEffect(() => {
        if (authService.hasToken) {
            setSpotifyApi(new SpotifyApi(authService.token));
        }
    }, [authService.hasToken, authService.token])

    return (
        <div style={{alignItems: "center", textAlign: "center"}}>
            {
                authService.hasToken ?
                    <>
                        {
                            step === AppStep.GenresSelection &&
                            <GenrePicker genreStore={genreStore} onFinish={() => setStep(AppStep.ArtistsSelection)}/>
                        }
                    </>
                    : <LoginForm/>
            }
        </div>
    )
}))