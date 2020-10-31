import React, {ChangeEvent, InputHTMLAttributes, useState} from "react";
import {observer} from "mobx-react";
import styled from "styled-components";

export const ArtistsSlider: React.FunctionComponent<ArtistsSliderProps> = observer(({onSliderValueChange}) => {

    const [recommendationLimit, setRecommendationLimit] = useState<number>(50);
    // const strings = useContext(LocaleContext);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRecommendationLimit(e.target.valueAsNumber);
        onSliderValueChange(e);
    }

    return (
        <StyledContainer>
            <StyleHeader>I want <b>{recommendationLimit}</b> tracks on my playlist</StyleHeader>
            <StyleSlider // TODO: restart slider to 20 instead of 50 - "value" doesn't work
                {...sliderProps}
                onChange={(e) => onChange(e)}
            />
        </StyledContainer>
    );
});

interface ArtistsSliderProps {
    onSliderValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
        pacity: 1;
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

