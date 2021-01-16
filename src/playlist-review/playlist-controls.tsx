import React, {useContext, useState} from "react";
import styled from "styled-components";
import {checkIcon, exportIcon, restart} from "../static-resources/icons";
import {Spinner, SpinnerSize} from "../shared-components/spinner";
import {LocaleContext} from "../spotifun";

export const PlaylistControls: React.FunctionComponent<{ onSave: () => Promise<void>; onStartOver: () => void }> = (({onSave, onStartOver}) => {

    const [saving, setSaving] = useState<boolean>();
    const [saved, setSaved] = useState<boolean>();
    const strings = useContext(LocaleContext);

    const onSaveClick = () => {
        if (saved) return;
        setSaving(true);
        onSave().then(() => {
            setSaved(true);
            setSaving(false);
        });
    }

    return (
        <StyledContainer>
            <StyledCenteredContainer>
                <StyledSaveButton onClick={onSaveClick} disabled={saved}>
                    {
                        saving ?
                            <Spinner size={SpinnerSize.small} backgroundColor={backgroundColor}/> :
                            <StyledIcon src={saved ? checkIcon : exportIcon}
                                        alt={strings.playlist_controls_save_button_save_playlist}/>
                    }
                    <StyledInnerContainer>
                        {
                            saved ?
                                strings.playlist_controls_save_button_playlist_saved :
                                strings.playlist_controls_save_button_save_playlist
                        }
                    </StyledInnerContainer>
                </StyledSaveButton>

                <StyledStartOverButton onClick={onStartOver}>
                    <StyledIcon src={restart}
                                alt={strings.playlist_controls_save_button_save_playlist}/>
                    <StyledInnerContainer>
                        {strings.playlist_controls_start_over_button}
                    </StyledInnerContainer>
                </StyledStartOverButton>
            </StyledCenteredContainer>
        </StyledContainer>
    );
});


const backgroundColor = "white";
const StyledContainer = styled.div`
    position: -webkit-sticky;
    position: sticky;
    display: flex;
    flex-direction: row;
    bottom: 0px;
    width: 100%;
    background: #eaeaea;
    padding: 8px;
`,
    StyledCenteredContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto;
`,
    StyledSaveButton = styled.button`
    outline: none;
    display: flex;
    margin-right: 4px;
    flex-direction: row;
    font: 700 14px 'Titillium Web', sans-serif;
    cursor: ${(props: any) => props.disabled ? 'default' : 'pointer'};
    border: none;
    background: none;
`,
    StyledStartOverButton = styled.button`
    outline: none;
    display: flex;
    flex-direction: row;
    font: 700 14px 'Titillium Web', sans-serif;
    cursor: ${(props: any) => props.disabled ? 'default' : 'pointer'};
    border: none;
    background: none;
`,
    StyledInnerContainer = styled.div`
    margin: auto 0 auto 8px;
`,
    StyledIcon = styled.img`
    height: 20px;
    margin: auto;
    filter: invert(74%) sepia(60%) saturate(4555%) hue-rotate(318deg) brightness(109%) contrast(114%);    
`;