import React from "react";
import styled from "styled-components";
import {BaseCardStyle, EllipsisText, RoundImage} from "../styles/common-styles";


/**
 * PlaylistReviewTable styles:
 */
const BlankCell = (props: {width: number} & React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => <th {...props} />
export const PLAYLIST_REVIEW_TABLE_BACKGROUND_COLOR = "#fefefe";
const baseTableHeader = `
    ${BaseCardStyle};
    background: ${PLAYLIST_REVIEW_TABLE_BACKGROUND_COLOR};
    margin: 0 8px;
    padding: 8px;
`;
export const PlaylistTable = styled.table`
    width: 70%;
    margin: 8px auto;
    text-align: center;
`,
    PlaylistHeaderRow = styled.tr`
    display: flex;
`,
    HeaderBlankCell = styled(BlankCell)`
    width: ${(props: any) => `${props.width}px`};    
`,
    TrackNameTh = styled.th`
    ${baseTableHeader}
    flex: 2;
`,
    PlaylistTh = styled.th`
    ${baseTableHeader}
    flex: 1;
`;


/**
 * PlaylistItem styles:
 */
const PLAYLIST_ITEM_PADDING = 8;
export const PlaylistItemRow = styled.tr`
    ${BaseCardStyle};
    display: flex;
    margin: ${PLAYLIST_ITEM_PADDING}px 0;
    background: ${PLAYLIST_REVIEW_TABLE_BACKGROUND_COLOR};
    padding-right: ${PLAYLIST_ITEM_PADDING}px;
`,
    TrackNameTd = styled.td`
    ${EllipsisText};
    flex: 2;
    margin: auto;
    padding: ${PLAYLIST_ITEM_PADDING}px;
    text-align: left;
`,
    HeartButtonTd = styled.td`
    margin: auto;
    padding: ${PLAYLIST_ITEM_PADDING}px;
    height: 24px;
`,
    PlaylistItemTd = styled.td`
    ${EllipsisText};
    flex: 1;
    margin: auto;
    text-align: left;
`;



/**
 * PlaylistItemAlbumImage styles:
 */
const IMAGE_HEIGHT = 48;
const albumImageBaseStyle = `
    position: relative;
    top: 0;
    left: 0;
    height: ${IMAGE_HEIGHT}px;
`
export const AlbumImageContainer = styled.div`
    ${albumImageBaseStyle}
    margin: 8px;    
`,
    AlbumImage = styled.img`
    ${RoundImage}
    ${albumImageBaseStyle}
`,
    //White overlay over the album art, when the user hovers it
    AlbumImageFilter = styled.div`
    display:none;
    position: absolute;
    top: 0;
    left: 0;
    height: ${IMAGE_HEIGHT+2}px;
    width: ${IMAGE_HEIGHT+2}px;
    border-radius: 50px;
    background: white;
    opacity: 0.35;
    ${AlbumImageContainer}:hover & {
        display: block;
    }
`,
    PlayButton = styled.img`
    display:none;
    position: absolute;
    top: 8px;
    left: 8px;
    height: 32px;
    opacity: 0.75;
    ${AlbumImageContainer}:hover & {
        display: block;
    }
`;


/**
 * PlaylistItemHeartButton styles:
 */
export const StyledHeartButton = styled.img`
    height: 24px;
    filter: invert(74%) sepia(60%) saturate(4555%) hue-rotate(318deg) brightness(109%) contrast(114%);
`;