import React, {useContext} from "react";
import {LoginConsts} from "../models/app-consts";
import {InformationPanel} from "../shared-components/info-panel";
import {AppButton} from "../shared-components/app-button";
import {LocaleContext} from "../spotifun";


export const LoginForm: React.FunctionComponent = () => {
    const strings = useContext(LocaleContext);

    return (
        <>
            <InformationPanel title={strings.login_form_info_box_title} description={strings.login_form_info_box_content}/>
            <AppButton
                label={"Login >"}
                url={loginUrl}/>
        </>
    )
};

const {authEndpoint, clientId, redirectUri, scopes} = LoginConsts;
const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code`