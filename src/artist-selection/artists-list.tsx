import React from "react";
import {ArtistSelectionBox} from "./artist-selection-box";
import {ArtistStore} from "./artist-store";
import {observer} from "mobx-react";
import {shuffle} from "lodash";

export const ArtistsList: React.FC<ArtistsListProps> = observer(({artistStore}) => {

    return (
        <div className="picker-container">
        {
                shuffle(Object.keys(artistStore.suggestedArtists)).map((artistId: string) =>
                    artistId &&
                    <ArtistSelectionBox
                        key={artistId}
                        artist={artistStore?.suggestedArtists[artistId]}
                        onItemSelect={artistStore.onItemSelect}
                    />)
            }
        </div>
    )
});

interface ArtistsListProps {
    artistStore: ArtistStore;
}