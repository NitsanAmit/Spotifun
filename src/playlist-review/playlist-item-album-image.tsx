import React, {useContext, useRef} from "react";
import playIcon from '../static-resources/icons/play_icon.png'
import * as Styled from "./playlist-review-styles";
import {LocaleContext} from "../spotifun";
import {PlaylistReviewStore} from "./playlist-review-store";
import {Track} from "../models/entity-models";

export const PlaylistItemAlbumImage: React.FunctionComponent<PlaylistItemProps> = ({track, playlistReviewStore}) => {

    const {album, previewUrl, id} = track;
    const strings = useContext(LocaleContext);
    const audio = useRef<HTMLAudioElement>(null);

    const playPreview = () => {
        if (!audio?.current) return;
        playlistReviewStore.playPreview(audio.current, id);
    }

    return (
        <Styled.AlbumImageContainer onClick={playPreview}>
            <Styled.AlbumImage src={album.image} alt={strings.playlist_item_album_image_alt}/>
            {
                previewUrl &&
                <>
                    <Styled.AlbumImageFilter/>
                    <Styled.PlayButton src={playIcon} alt={strings.playlist_item_album_image_play_button_alt}/>
                    <audio ref={audio}>
                        <source src={previewUrl} type="audio/mp3"/>
                    </audio>
                </>
            }
        </Styled.AlbumImageContainer>
    );
}

export interface PlaylistItemProps {
    track: Track;
    playlistReviewStore: PlaylistReviewStore;
}