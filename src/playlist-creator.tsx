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

const DEFAULT_TRACKS_LIMIT = 20;

export const PlaylistCreator: React.FunctionComponent<{ authService: AuthService }> = observer((({authService}) => {

    const [step, setStep] = useState<AppStep>(AppStep.GenresSelection);
    const [user, setUser] = useState<User>();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [tracksLimit, setTracksLimit] = useState<number>(DEFAULT_TRACKS_LIMIT);
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
    }, [authService.refreshAuthToken, authService.token, authService])

    const onGenreSelect = (genres: string[]) => {
        setSelectedGenres(genres);
        setStep(AppStep.ArtistsSelection);
    }

    const onArtistSelect = async (artists: string[], selectedTracksLimit: number) => {
        setSelectedArtists(artists);
        setTracksLimit(selectedTracksLimit)
        setStep(AppStep.PlaylistReview);
    }

    const onStartOver = () => {
        setSelectedGenres([]);
        setSelectedArtists([]);
        setTracksLimit(DEFAULT_TRACKS_LIMIT)
        setStep(AppStep.GenresSelection);
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
                            <ArtistPicker spotifyApi={spotifyApi}
                                          selectedGenres={selectedGenres}
                                          onFinish={onArtistSelect}/>
                        }
                        {
                            step === AppStep.PlaylistReview &&
                            <PlaylistReview spotifyApi={spotifyApi}
                                            userId={authService.userId}
                                            selectedGenres={selectedGenres}
                                            selectedArtists={selectedArtists}
                                            tracksLimit={tracksLimit}
                                            onStartOver={onStartOver}
                            />
                        }
                    </>
                    : <LoginForm/>
            }
        </>
    )
}))