import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {AppStep} from "./models/app-consts";
import {SpotifyApi} from "./networking/spotify.api";
import {GenrePicker} from "./genre-selection/genre-picker";
import {LoginForm} from "./login-page/login-form";
import {AuthService} from "./networking/auth-service";
import {ArtistPicker} from "./artist-selection/artist-picker";
import {PlaylistReview} from "./playlist-review/playlist-review";

export const PlaylistCreator: React.FunctionComponent<{ authService: AuthService }> = observer((({authService}) => {

    const [step, setStep] = useState<AppStep>(AppStep.GenresSelection);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [spotifyApi, setSpotifyApi] = useState<SpotifyApi>();

    useEffect(() => {
        if (authService.token) {
            setSpotifyApi(new SpotifyApi(authService.token, authService.refreshAuthToken));
        }
    }, [authService.refreshAuthToken, authService.token])

    const onGenreSelect = (genres: string[]) => {
        setSelectedGenres(genres);
        setStep(AppStep.ArtistsSelection);
    }

    const onArtistSelect = async (artists: string[]) => {
        setSelectedArtists(artists);
        setStep(AppStep.PlaylistReview);
    }

    return (
        <div style={{alignItems: "center", textAlign: "center"}}>
            {
                spotifyApi ?
                    <>
                        {
                            step === AppStep.GenresSelection &&
                            <GenrePicker onFinish={onGenreSelect}/>
                        }
                        {
                            step === AppStep.ArtistsSelection &&
                            <ArtistPicker spotifyApi={spotifyApi} selectedGenres={selectedGenres}
                                          onFinish={onArtistSelect}/>
                        }
                        {
                            step === AppStep.PlaylistReview &&
                            <PlaylistReview spotifyApi={spotifyApi}
                                            selectedGenres={selectedGenres}
                                            selectedArtists={selectedArtists}
                            />
                        }
                    </>
                    : <LoginForm/>
            }
        </div>
    )
}))