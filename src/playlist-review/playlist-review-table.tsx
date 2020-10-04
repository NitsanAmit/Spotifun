import React from "react";
import {PlaylistItem} from "./playlist-item";
import * as Styled from "./playlist-review-styles";
import {PlaylistReviewStore} from "./playlist-review-store";
import {observer} from "mobx-react";


export const PlaylistReviewTable: React.FunctionComponent<PlaylistReviewTableProps> = observer(({playlistReviewStore}) => {

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
                playlistReviewStore.tracks.map(track => <PlaylistItem key={track.id}
                                                                      playlistReviewStore={playlistReviewStore}
                                                                      track={track} />)
            }
            </tbody>
        </Styled.PlaylistTable>
    )
});

export interface PlaylistReviewTableProps {
    playlistReviewStore: PlaylistReviewStore;
}
