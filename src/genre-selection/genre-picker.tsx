import React from "react";
import {GenreSelectionBox} from "./genre-selection-box";
import "../pickers.css"
import {GenreStore} from "./genre-store";

export const GenrePicker: React.FunctionComponent<{ genreStore: GenreStore }> = ({genreStore}) => {

    return (
        <>
            <h2>Pick your Genre:</h2>
            <div className="picker-container">
                {
                    Object.keys(genreStore.allGenres).map((genreId: string) =>
                        genreId &&
                        <GenreSelectionBox
                            key={genreId}
                            genre={genreStore.allGenres[genreId]}
                            onItemSelect={genreStore.onItemSelect}
                        />)
                }
            </div>
        </>
    )
};