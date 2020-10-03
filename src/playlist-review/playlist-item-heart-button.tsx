import React, {useContext, useState} from "react";
import fullHeart from "../static-resources/icons/heart-solid.svg";
import emptyHeart from "../static-resources/icons/heart-regular.svg";
import styled from "@emotion/styled";
import {SpotifyApi} from "../networking/spotify.api";
import {LocaleContext} from "../spotifun";

export const PlaylistItemHeartButton: React.FunctionComponent<PlaylistItemHeartButtonProps> = ({trackId, spotifyApi}) => {

    const [inUserLibrary, setInUserLibrary] = useState<boolean>(); // TODO fetch song current like status
    const strings = useContext(LocaleContext);

    const toggleLikeStatus = async (): Promise<void> => {
        inUserLibrary ?
            await spotifyApi.removeFromUserLibrary(trackId) :
            await spotifyApi.addToUserLibrary(trackId); //TODO
        setInUserLibrary(!inUserLibrary)
    }

    return (
        <StyledHeartButton
            src={inUserLibrary ? fullHeart : emptyHeart}
            alt={strings.playlist_item_heart_button_alt}
            onClick={() => toggleLikeStatus()}
        />
    );
}

interface PlaylistItemHeartButtonProps {
    trackId: string;
    spotifyApi: SpotifyApi;
}

const StyledHeartButton = styled.img`
    height: 32px;
    filter: invert(74%) sepia(60%) saturate(4555%) hue-rotate(318deg) brightness(109%) contrast(114%);
`;