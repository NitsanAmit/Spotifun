import React, {useContext, useEffect, useState} from "react";
import {PlaylistReviewTable} from "./playlist-review-table";
import {SpotifyApi} from "../networking/spotify.api";
import {PlaylistReviewStore} from "./playlist-review-store";
import {Spinner} from "../shared-components/spinner";
import { PlaylistControls } from "./playlist-controls";
import {Genres} from "../models/genres";
import {LocaleContext} from "../spotifun";
import styled from "styled-components";


export const PlaylistReview: React.FunctionComponent<PlaylistReviewProps> = ({spotifyApi,userId , selectedGenres, selectedArtists, tracksLimit}) => {

    const [playlistReviewStore, setPlaylistReviewStore] = useState<PlaylistReviewStore>();
    const strings = useContext(LocaleContext);

    useEffect(() => {
        setPlaylistReviewStore(new PlaylistReviewStore(spotifyApi, selectedGenres, selectedArtists, tracksLimit));
    }, [selectedArtists, selectedGenres, spotifyApi]);

    const savePlaylist = async () => {
        if (!playlistReviewStore) return;
        return spotifyApi.createPlaylist(playlistReviewStore.tracks.map(track => track.uri), userId, getPlaylistName(selectedGenres));
    };

    return (
        <>
            {
                playlistReviewStore ?
                    <StyledContainer>
                        <h2>{strings.playlist_review_title}</h2>
                        {strings.playlist_review_description}
                        <PlaylistReviewTable playlistReviewStore={playlistReviewStore}/>
                        <PlaylistControls onSave={savePlaylist}/>
                    </StyledContainer>
                    : <Spinner/>
            }
        </>
    );
}


function getPlaylistName(selectedGenres: string[]) {
    return `My ${selectedGenres.map(id => Genres[id].name).join(", ")} Playlist - ${new Date().toLocaleDateString()}`;
}


interface PlaylistReviewProps {
    spotifyApi: SpotifyApi;
    userId: string;
    selectedGenres: string[];
    selectedArtists: string[];
    tracksLimit: number;
}

const StyledContainer = styled.div`
    text-align: center;  
    white-space: pre-line;
`;
