import React from "react";
import {SelectionBox} from "../shared-components/selection-box";
import {Genre} from "../models/entity-models";
import {observer} from "mobx-react/dist";


export const GenreSelectionBox: React.FC<GenreSelectionBoxProps> = observer(({genre, onItemSelect}) => {

    return (
        <SelectionBox
            additionalClass="genre-selection-box"
            id={genre.id}
            label={genre.name}
            backgroundImage={genre.image}
            isSelected={genre.selected}
            onItemSelect={onItemSelect}
        />
    )
})

interface GenreSelectionBoxProps {
    genre: Genre,
    onItemSelect: (event: string) => void
}