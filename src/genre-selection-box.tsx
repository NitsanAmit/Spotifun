import React from "react";
import {SelectionBox} from "./selection-box";
import {Genre} from "./models/Models";


export const GenreSelectionBox: React.FC<genreSelectionBoxProps> = ({genre, onItemSelect}) => {

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
}

interface genreSelectionBoxProps {
    genre: Genre,
    onItemSelect: (event: any) => void
}

const styles = {
    backgroundRepeat: "no-repeat",
    backgroundSize: 80,
    backgroundPosition: "center",
    backgroundColor: "white",
    color: "#ff7676",
    textShadow: "-1px 1px 1px #d1d1d1",
}