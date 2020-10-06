import React, {useContext, useEffect, useState} from "react";
import {GenreSelectionBox} from "./genre-selection-box";
import "../styles/pickers.css"
import {GenreStore} from "./genre-store";
import {observer} from "mobx-react";
import {AppButton} from "../shared-components/app-button";
import {LocaleContext} from "../spotifun";

export const GenrePicker: React.FunctionComponent<{ onFinish: (genres: string[]) => void }> = observer(({onFinish}) => {

    const [genreStore, setGenreStore] = useState<GenreStore>();
    const strings = useContext(LocaleContext);

    useEffect(() => {
        setGenreStore(new GenreStore());
    }, []);

    return genreStore ?
        <>
            <h2>{strings.genre_picker_title}</h2>
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
            <AppButton label={strings.genre_picker_proceed_button}
                       disabled={!genreStore.selectionComplete}
                       onButtonClick={() => onFinish(genreStore.selectedGenres)}/>
        </> : null;
});