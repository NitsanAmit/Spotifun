import React, {useContext, useEffect, useState} from "react";
import {ArtistStore} from "./artist-store";
import {SpotifyApi} from "../networking/spotify.api";
import {AppButton} from "../shared-components/app-button";
import {observer} from "mobx-react";
import {InformationPanel} from "../shared-components/info-panel";
import {LocaleContext} from "../spotifun";
import {TracksLimitSlider} from "./tracks-limit-slider";
import {ArtistsList} from "./artists-list";

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
                        <ArtistsList artistStore={artistStore}/>
                        <TracksLimitSlider artistStore={artistStore} />
                        <AppButton
                            label={artistStore.selectionComplete ? strings.artists_picker_proceed_button_enabled : strings.artists_picker_proceed_button_disabled}
                            disabled={!artistStore.selectionComplete}
                            onButtonClick={() => onFinish(artistStore.selectedArtists, artistStore.tracksLimit)}/>
                    </>
                    : <h2>Loading...</h2>
            }
        </>
    )
});

interface ArtistPickerProps {
    spotifyApi: SpotifyApi;
    selectedGenres: string[];
    onFinish: (selectedArtistsIds: string[], selectedTracksLimit: number) => void;
}