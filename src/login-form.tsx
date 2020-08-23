import React from "react";
import {AppButton} from "./app-button";
import {LoginConsts} from "./models/app-consts";
import {InformationPanel} from "./info-panel";


export const LoginForm: React.FunctionComponent = (props) => {
    return (
        <>
            <InformationPanel title={"Hello!"} description={"Please login to enjoy our amazing applicatzyush"}/>

            <AppButton
                label={"Login >"}
                url={loginUrl}/>
        </>
    )
};

const loginUrl = `${LoginConsts.authEndpoint}?client_id=${LoginConsts.clientId}&redirect_uri=${encodeURIComponent(LoginConsts.redirectUri)}&scope=${encodeURIComponent(LoginConsts.scopes)}&response_type=token&show_dialog=true`