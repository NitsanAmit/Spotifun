import React, {ChangeEvent, useContext, useState} from "react";
import {observer} from "mobx-react";
import {LocaleContext} from "../spotifun";
import "./artists-slider.css"

export const ArtistsSlider: React.FunctionComponent<ArtistsSliderProps> = observer(({onSliderChange}) => {

    const [recommendationLimit, setRecommendationLimit] = useState<number>(50);
    // const strings = useContext(LocaleContext);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRecommendationLimit(e.target.valueAsNumber);
        onSliderChange(e);
    }

    return (
        <div className="slidecontainer">
            <div style={{"marginBottom": "10px"}}>I want <b>{recommendationLimit}</b> tracks on my playlist</div>
            <input // TODO: restart slider to 20 instead of 50 - "value" doesn't work
                className="slider"
                id="myRange"
                type="range"
                min="10"
                max="50"
                step="5"
                onChange={(e) => onChange(e)}
            />
        </div>
    );
});

interface ArtistsSliderProps {
    onSliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
}