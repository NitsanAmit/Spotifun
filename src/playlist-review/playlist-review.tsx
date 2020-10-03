import React from "react";
import {PlaylistReviewTable, PlaylistReviewTableProps} from "./playlist-review-table";

export const PlaylistReview: React.FunctionComponent<PlaylistReviewTableProps> = ({tracks, spotifyApi}) => {

    return (
        <>
            <h2>Here is your amazing playlist!!!</h2>
            <PlaylistReviewTable spotifyApi={spotifyApi} tracks={tracks}/>
        </>
    );
}