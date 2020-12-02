import React, {ChangeEvent, InputHTMLAttributes} from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {ArtistStore} from "./artist-store";

export const TracksLimitSlider: React.FunctionComponent<ArtistsSliderProps> = observer(({artistStore}) => {

    const onSliderChange = (e: ChangeEvent<HTMLInputElement>) => artistStore.tracksLimit = e.target.valueAsNumber;

    return (
        <StyledContainer>
            <StyleHeader>I want <b>{artistStore.tracksLimit}</b> tracks on my playlist</StyleHeader>
            <StyleSlider
                {...sliderProps}
                defaultValue={artistStore.tracksLimit}
                onChange={onSliderChange}
            />
        </StyledContainer>
    );
});

interface ArtistsSliderProps {
    artistStore: ArtistStore;
}

const sliderProps : InputHTMLAttributes<HTMLInputElement> = {
    type: "range",
    min: 10,
    max: 50,
    step: 5
}

const StyledContainer = styled.div`
    width: 100%;
    text-align: center;
`,
    StyleSlider = styled.input`
    -webkit-appearance: none;
    width: 15%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    &:hover {
        opacity: 1;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #ff7676;
        cursor: pointer;
    }
    &::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #ff7676;
        cursor: pointer;
    }
`,
    StyleHeader = styled.div`
        margin-bottom: 10px
`;

