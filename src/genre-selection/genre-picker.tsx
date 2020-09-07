import React, {useEffect, useState} from "react";
import {GenreSelectionBox} from "./genre-selection-box";
import "../pickers.css"
import {GenreStore} from "./genre-store";
import {observer} from "mobx-react";
import {AppButton} from "../shared-components/app-button";

export const GenrePicker: React.FunctionComponent<{ onFinish: (genres: string[]) => void }> = observer(({onFinish}) => {

    const [genreStore, setGenreStore] = useState<GenreStore>();

    useEffect(() => {
        setGenreStore(new GenreStore());
    }, []);

    return (
        <>
            {
                genreStore &&
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
                    <AppButton label="Proceed to artists selection >"
                               disabled={!genreStore.selectionComplete}
                               onButtonClick={() => onFinish(genreStore.selectedGenres)}/>
                </>
            }
        </>
    )
});