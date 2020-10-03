import React from "react";
import {PlaylistItem} from "./playlist-item";
import {Track} from "../models/entity-models";
import {SpotifyApi} from "../networking/spotify.api";
import * as Styled from "./playlist-review-styles";


export const PlaylistReviewTable: React.FunctionComponent<PlaylistReviewTableProps> = ({tracks, spotifyApi}) => {

    return (
        <Styled.PlaylistTable>
            <thead>
            <Styled.PlaylistHeaderRow>
                <Styled.HeaderBlankCell width={66} />
                <Styled.TrackNameTh>Track name</Styled.TrackNameTh>
                <Styled.PlaylistTh>Artist(s)</Styled.PlaylistTh>
                <Styled.PlaylistTh>Album</Styled.PlaylistTh>
                <Styled.HeaderBlankCell width={55} />
            </Styled.PlaylistHeaderRow>
            </thead>
            <tbody>
            {
                tracks.map(track => <PlaylistItem key={track.id} track={track} spotifyApi={spotifyApi}/>)
            }
            </tbody>
        </Styled.PlaylistTable>
    )
}

export interface PlaylistReviewTableProps {
    spotifyApi: SpotifyApi;
    tracks: Track[];
}
