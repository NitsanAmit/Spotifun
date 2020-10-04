import React, {useContext} from "react";
import fullHeart from "../static-resources/icons/heart-solid.svg";
import emptyHeart from "../static-resources/icons/heart-regular.svg";
import {LocaleContext} from "../spotifun";
import {Track} from "../models/entity-models";
import { StyledHeartButton } from "./playlist-review-styles";
import {observer} from "mobx-react";

export const PlaylistItemHeartButton: React.FunctionComponent<PlaylistItemHeartButtonProps> = observer(({track, onHeartClick}) => {

    const strings = useContext(LocaleContext);

    return (
        <StyledHeartButton
            src={track.inUserLibrary ? fullHeart : emptyHeart}
            alt={strings.playlist_item_heart_button_alt}
            onClick={() => onHeartClick(track.id)}
        />
    );
});

interface PlaylistItemHeartButtonProps {
    track: Track;
    onHeartClick: (trackId: string) => void;
}