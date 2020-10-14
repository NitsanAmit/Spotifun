import React, {useContext, useEffect, useState} from "react";
import "../styles/pickers.css"
import {ArtistSelectionBox} from "./artist-selection-box";
import {ArtistStore} from "./artist-store";
import {SpotifyApi} from "../networking/spotify.api";
import {AppButton} from "../shared-components/app-button";
import {observer} from "mobx-react";
import {InformationPanel} from "../shared-components/info-panel";
import {LocaleContext} from "../spotifun";

export const ArtistPicker: React.FC<ArtistPickerProps> = observer(({spotifyApi, selectedGenres, onFinish}) => {

    const [artistStore, setArtistStore] = useState<ArtistStore>();
    const strings = useContext(LocaleContext);

    useEffect(() => {
        setArtistStore(new ArtistStore(spotifyApi, selectedGenres));
    }, [selectedGenres, spotifyApi]);

    return (
        <>
            {
                artistStore ?
                    <>
                        {
                            artistStore.isFromRecommendation &&
                            <InformationPanel title={strings.artists_picker_info_box_title}
                                              description={strings.artists_picker_info_box_content}
                                              canDismiss
                            />
                        }
                        <h2>{strings.artists_picker_title}</h2>
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
                        <AppButton
                            label={artistStore.selectionComplete ? strings.artists_picker_proceed_button_enabled : strings.artists_picker_proceed_button_disabled}
                            disabled={!artistStore.selectionComplete}
                            onButtonClick={() => onFinish(artistStore.selectedArtists)}/>
                    </>
                    : <h2>Loading...</h2>
            }
        </>
    )
    //TODO NOAM add a slider to choose the amount of songs you wish to get in the created playlist, and pass as limit to getRecommendations
});

interface ArtistPickerProps {
    spotifyApi: SpotifyApi;
    selectedGenres: string[];
    onFinish: (genres: string[]) => void;
}