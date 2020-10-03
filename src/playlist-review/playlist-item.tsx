import React from "react";
import {Artist, Track} from "../models/entity-models";
import {PlaylistItemAlbumImage} from "./playlist-item-album-image";
import {PlaylistItemHeartButton} from "./playlist-item-heart-button";
import {SpotifyApi} from "../networking/spotify.api";
import {Link} from "../shared-components/link";
import * as Styled from "./playlist-review-styles";


export const PlaylistItem: React.FunctionComponent<PlaylistItemProps> = ({track, spotifyApi}) => {
    const {artists, name, album, previewUrl} = track;

    return (
        <Styled.PlaylistItemRow>
            <td>
                <PlaylistItemAlbumImage image={album.image} previewUrl={previewUrl}/>
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
                <PlaylistItemHeartButton spotifyApi={spotifyApi} trackId={track.id}/>
            </Styled.HeartButtonTd>
        </Styled.PlaylistItemRow>
    );
}

const getArtistsListWithLinks = (artists: Artist[]) =>
    artists.map((artist, index) =>
        <Link href={artist.externalUrl}
              target="_blank">
            {artist.name + ((index !== artists.length - 1) ? ', ' : '')}
        </Link>
    );

export interface PlaylistItemProps {
    spotifyApi: SpotifyApi;
    track: Track;
}
