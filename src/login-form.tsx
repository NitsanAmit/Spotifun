import React from "react";
import {LoginConsts} from "./models/app-consts";
import {InformationPanel} from "./shared-components/info-panel";
import {AppButton} from "./shared-components/app-button";


export const LoginForm: React.FunctionComponent = () => {
    return (
        <>
            <InformationPanel title={"Hello!"} description={"Please login to enjoy our amazing applicatzyush"}/>

            <AppButton
                label={"Login >"}
                url={loginUrl}/>
        </>
    )
};

const {authEndpoint, clientId, redirectUri, scopes} = LoginConsts;
const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code`