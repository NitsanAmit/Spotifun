import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {AppStep} from "./models/app-consts";
import {SpotifyApi} from "./networking/spotify.api";
import {GenrePicker} from "./genre-selection/genre-picker";
import {LoginForm} from "./login-page/login-form";
import {AuthService} from "./networking/auth-service";
import {ArtistPicker} from "./artist-selection/artist-picker";
import {PlaylistReview} from "./playlist-review/playlist-review";
import {User} from "./models/entity-models";
import {UserCard} from "./shared-components/user-card";

export const PlaylistCreator: React.FunctionComponent<{ authService: AuthService }> = observer((({authService}) => {

    const [step, setStep] = useState<AppStep>(AppStep.GenresSelection);
    const [user, setUser] = useState<User>();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [spotifyApi, setSpotifyApi] = useState<SpotifyApi>();

    useEffect(() => {
        if (authService.token) {
            const api = new SpotifyApi(authService.token, authService.refreshAuthToken);
            api.getUserDetails().then(user => {
                setUser(user);
                authService.saveUserId(user.id);
            });
            setSpotifyApi(api);
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
        <>
            {
                user &&
                <UserCard user={user}/>
            }
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
                                            userId={authService.userId}
                                            selectedGenres={selectedGenres}
                                            selectedArtists={selectedArtists}
                            />
                        }
                    </>
                    : <LoginForm/>
            }
        </>
    )
}))