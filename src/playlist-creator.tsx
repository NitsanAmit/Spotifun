import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {AppStep} from "./models/app-consts";
import {SpotifyApi} from "./spotifyApi";
import {GenrePicker} from "./genre-selection/genre-picker";
import {LoginForm} from "./login-form";
import {AuthService} from "./auth-service";

export const PlaylistCreator: React.FunctionComponent<{authService: AuthService}> = observer((({authService}) => {

    const [step, setStep] = useState<AppStep>(AppStep.GenresSelection);
    const [selectedGenres, setSelectedGenres] = useState<string[]>();
    const [spotifyApi, setSpotifyApi] = useState<SpotifyApi>();

    useEffect(() => {
        if (authService.token) {
            setSpotifyApi(new SpotifyApi(authService.token, authService.refreshAuthToken));
        }
    }, [authService.token])

    const onGenreSelect = (genres: string[]) => {
        setSelectedGenres(genres);
        setStep(AppStep.ArtistsSelection);
    }

    return (
        <div style={{alignItems: "center", textAlign: "center"}}>
            {
                authService.token ?
                    <>
                        {
                            step === AppStep.GenresSelection &&
                            <GenrePicker onFinish={onGenreSelect}/>
                        }
                    </>
                    : <LoginForm />
            }
        </div>
    )
}))