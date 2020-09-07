
import React from "react";
import {Artist} from "../models/entity-models";
import {SelectionBox} from "../shared-components/selection-box";
import {observer} from "mobx-react/dist";

export const ArtistSelectionBox: React.FC<ArtistSelectionBoxProps> = observer(({artist, onItemSelect}) => {

    return (
        <SelectionBox
            styles={styles}
            id={artist.id}
            label={artist.name}
            backgroundImage={artist.image}
            isSelected={artist.selected}
            onItemSelect={onItemSelect}
        />
    )
})

interface ArtistSelectionBoxProps {
    artist: Artist,
    onItemSelect: (event: string) => void
}

const styles = {
    backgroundRepeat: "round",
    textShadow: "-1px 1px 1px #434343",
}