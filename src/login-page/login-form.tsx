import React, {useContext} from "react";
import {LoginConsts} from "../models/app-consts";
import {AppButton} from "../shared-components/app-button";
import {LocaleContext} from "../spotifun";
import styled from "styled-components";

export const LoginForm: React.FunctionComponent = () => {
    const strings = useContext(LocaleContext);
    return (
        <StyledContainer>
            <h1>
                {
                    strings.login_form_info_box_title
                }
            </h1>
            <StyledSpan>
                {
                    strings.login_form_info_box_content
                }
            </StyledSpan>
            <AppButton
                label={"Login >"}
                url={loginUrl}/>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
    margin: 16px auto;
    text-align: center;
`,
    StyledSpan = styled.span`
    font-size: 20px;
`;

const {authEndpoint, clientId, redirectUri, scopes} = LoginConsts;
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`


