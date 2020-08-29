import React from "react";
import {SelectionBox} from "../selection-box";
import {Genre} from "../models/Models";
import {observer} from "mobx-react";


export const GenreSelectionBox: React.FC<GenreSelectionBoxProps> = observer(({genre, onItemSelect}) => {

    return (
        <SelectionBox
            styles={styles}
            id={genre.id}
            label={genre.name}
            backgroundImage={genre.imagePath}
            isSelected={genre.selected}
            onItemSelect={onItemSelect}
        />
    )
})

interface GenreSelectionBoxProps {
    genre: Genre,
    onItemSelect: (event: string) => void
}

const styles = {
    backgroundRepeat: "no-repeat",
    backgroundSize: 80,
    backgroundPosition: "center",
    backgroundColor: "white",
    color: "#ff7676",
    textShadow: "-1px 1px 1px #d1d1d1",
}