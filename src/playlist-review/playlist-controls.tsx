import React, {useContext, useState} from "react";
import styled from "styled-components";
import {checkIcon, exportIcon} from "../static-resources/icons";
import {Spinner, SpinnerSize} from "../shared-components/spinner";
import {LocaleContext} from "../spotifun";
import {BaseCardStyle} from "../styles/common-styles";

export const PlaylistControls: React.FunctionComponent<{ onSave: () => Promise<void> }> = (({onSave}) => {

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
        <StyledContainer onClick={onSaveClick} disabled={saved}>
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
        </StyledContainer>
    );
});


const backgroundColor = "white";
const StyledContainer = styled.button`
    ${BaseCardStyle};
    position: -webkit-sticky;
    position: sticky;
    bottom: 8px;
    float: right;
    margin: auto 8px;
    background: ${backgroundColor};
    outline: none;
    padding: 12px;
    display: flex;
    flex-direction: row;
    font: 22px 'Titillium Web', sans-serif;
    cursor: ${(props: any) => props.disabled ? 'default' : 'pointer'};
`,
    StyledInnerContainer = styled.div`
    margin: auto 0 auto 4px;
`,
    StyledIcon = styled.img`
    height: 24px;
    width: 24px;
    margin: auto;
    filter: invert(74%) sepia(60%) saturate(4555%) hue-rotate(318deg) brightness(109%) contrast(114%);    
`;