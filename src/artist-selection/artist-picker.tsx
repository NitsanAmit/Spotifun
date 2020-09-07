import React, {useEffect, useState} from "react";
import {ArtistSelectionBox} from "./artist-selection-box";
import "../pickers.css"
import {ArtistStore} from "./artist-store";
import {SpotifyApi} from "../spotify.api";
import {AppButton} from "../shared-components/app-button";
import {observer} from "mobx-react";

export const ArtistPicker: React.FC<ArtistPickerProps> = observer(({spotifyApi, selectedGenres, onFinish}) => {

    const [artistStore, setArtistStore] = useState<ArtistStore>();

    useEffect(() => {
        setArtistStore(new ArtistStore(spotifyApi, selectedGenres));
    }, []);

    return (
        <>
            {
                artistStore ?
                    <>
                        <h2>Pick your Artists:</h2>
                        <div className="picker-container">
                            {
                                Object.keys(artistStore.artistsByGenre).map((artistId: string) =>
                                    artistId &&
                                    <ArtistSelectionBox
                                        key={artistId}
                                        artist={artistStore.artistsByGenre[artistId]}
                                        onItemSelect={artistStore.onItemSelect}
                                    />)
                            }
                        </div>
                        <AppButton label="Proceed to artists selection >"
                                   disabled={!artistStore.selectionComplete}
                                   onButtonClick={() => onFinish(artistStore.selectedArtists)}/>
                    </>
                    : <h2>Loading...</h2>
            }
        </>
    )
});

interface ArtistPickerProps {
    spotifyApi: SpotifyApi;
    selectedGenres: string[];
    onFinish: (genres: string[]) => void;
}