import React, {useContext, useRef} from "react";
import playIcon from '../static-resources/icons/play_icon.png'
import * as Styled from "./playlist-review-styles";
import {LocaleContext} from "../spotifun";

export const PlaylistItemAlbumImage: React.FunctionComponent<PlaylistItemProps> = (props) => {

    const strings = useContext(LocaleContext);
    const {image, previewUrl} = props;
    const audio = useRef<HTMLAudioElement>(null);

    const playPreview = () => {
        if (!audio) return;
        if (!audio.current?.paused && !audio.current?.ended) return audio.current?.pause();
        //TODO if another audio is currently playing in parent - pause it before playing
        audio.current?.play();
    }

    return (
        <Styled.AlbumImageContainer onClick={() => playPreview()}>
            <Styled.AlbumImage src={image} alt={strings.playlist_item_album_image_alt} {...props} />
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
    image: string;
    previewUrl: string;
}