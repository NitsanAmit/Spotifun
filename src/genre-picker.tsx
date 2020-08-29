import React from "react";
import {Genre} from "./models/Models";
import {GenreSelectionBox} from "./genre-selection-box";
import "./pickers.css"


export const GenrePicker: React.FC<GenrePickerProps> = ({genres, onItemSelect}) => {

    return (
        <>
            <h2>Pick your Genre:</h2>
            <div className="picker-container">
                {
                    Object.keys(genres).map((genreId: string) =>
                        genreId &&
                        <GenreSelectionBox
                            key={genreId}
                            genre={genres[genreId]}
                            onItemSelect={onItemSelect}
                        />)
                }
            </div>
        </>
    )
};

interface GenrePickerProps {
    genres: { [key: string]: Genre };
    onItemSelect: (event: any) => void;
}