import React from "react";
import {Artist, Track} from "../models/entity-models";
import {PlaylistItemAlbumImage} from "./playlist-item-album-image";
import {PlaylistItemHeartButton} from "./playlist-item-heart-button";
import {Link} from "../shared-components/link";
import * as Styled from "./playlist-review-styles";
import { Spinner } from "../shared-components/spinner";
import {PLAYLIST_REVIEW_TABLE_BACKGROUND_COLOR} from "./playlist-review-styles";
import {PlaylistReviewStore} from "./playlist-review-store";
import {observer} from "mobx-react";


export const PlaylistItem: React.FunctionComponent<PlaylistItemProps> = observer(({playlistReviewStore, track}) => {
    const {artists, name, album} = track;

    return (
        <Styled.PlaylistItemRow>
            <td>
                <PlaylistItemAlbumImage track={track} playlistReviewStore={playlistReviewStore}/>
            </td>
            <Styled.TrackNameTd>
                <Link href={track.externalUrl} target="_blank">{name}</Link>
            </Styled.TrackNameTd>
            <Styled.PlaylistItemTd>
                {getArtistsListWithLinks(artists)}
            </Styled.PlaylistItemTd>
            <Styled.PlaylistItemTd>
                <Link href={album.externalUrl} target="_blank">{album.name}</Link>
            </Styled.PlaylistItemTd>
            <Styled.HeartButtonTd>
                {
                    track.inUserLibrary !== undefined ?
                    <PlaylistItemHeartButton
                        track={track}
                        onHeartClick={playlistReviewStore.toggleTrackSaveStatus}
                    />
                    : <Spinner background={PLAYLIST_REVIEW_TABLE_BACKGROUND_COLOR}/>
                }
            </Styled.HeartButtonTd>
        </Styled.PlaylistItemRow>
    );
});

const getArtistsListWithLinks = (artists: Artist[]) =>
    artists.map((artist, index) =>
        <Link href={artist.externalUrl}
              target="_blank">
            {artist.name + ((index !== artists.length - 1) ? ', ' : '')}
        </Link>
    );

export interface PlaylistItemProps {
    playlistReviewStore: PlaylistReviewStore;
    track: Track;
}
