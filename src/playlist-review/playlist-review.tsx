import React, {useEffect, useState} from "react";
import {PlaylistReviewTable} from "./playlist-review-table";
import {SpotifyApi} from "../networking/spotify.api";
import {PlaylistReviewStore} from "./playlist-review-store";
import {Spinner} from "../shared-components/spinner";

export const PlaylistReview: React.FunctionComponent<PlaylistReviewProps> = ({spotifyApi, selectedGenres, selectedArtists}) => {

    const [playlistReviewStore, setPlaylistReviewStore] = useState<PlaylistReviewStore>();

    useEffect(() => {
        setPlaylistReviewStore(new PlaylistReviewStore(spotifyApi, selectedGenres, selectedArtists));
    }, [selectedArtists, selectedGenres, spotifyApi]);

    return (
        <>
            {
                playlistReviewStore ?
                    <>
                        <h2>Here is your amazing playlist!!!</h2>
                        <PlaylistReviewTable playlistReviewStore={playlistReviewStore}/>
                    </>
                    : <Spinner/>
            }
        </>
    );
}

interface PlaylistReviewProps {
    spotifyApi: SpotifyApi;
    selectedGenres: string[];
    selectedArtists: string[];
}