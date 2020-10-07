import React, {useContext} from "react";
import {User} from "../models/entity-models";
import {PLAYLIST_REVIEW_TABLE_BACKGROUND_COLOR} from "../playlist-review/playlist-review-styles";
import styled from "styled-components";
import {Link} from "./link";
import {LocaleContext} from "../spotifun";
import {BaseCardStyle, EllipsisText, RoundImage} from "../styles/common-styles";


export const UserCard: React.FunctionComponent<{ user: User }> = ({user}) => {

    const strings = useContext(LocaleContext);
    const {name, image, recentlyPlayed} = user;

    return (
        <StyledContainer>
            <ProfilePicture src={image} alt={strings.user_card_profile_alt}/>
            <StyledInnerContainer>
                <b>{name}</b>
                <Link href={recentlyPlayed?.externalUrl} target="_blank">
                    {recentlyPlayed?.name}
                </Link>
                {recentlyPlayed?.artists.map(artist => artist.name).join(", ")}
            </StyledInnerContainer>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    ${BaseCardStyle};
    position: sticky;
    top: 8px;
    width: 47px;
    display: flex;
    margin-left: 8px;
    background: ${PLAYLIST_REVIEW_TABLE_BACKGROUND_COLOR};
    z-index: 10;
    transition: width 0.5s;
    -webkit-transition: width 0.5s;
    &:hover {
        width: 200px;
        padding-right: 8px;
    }
`,
    StyledInnerContainer = styled.div`
    ${EllipsisText};
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: auto 8px;
    font-size: 10px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
    ${StyledContainer}:hover & {
        visibility: visible;
        opacity: 1;
    }
`,
    ProfilePicture = styled.img`
    ${RoundImage}
    height: 48px;
`;