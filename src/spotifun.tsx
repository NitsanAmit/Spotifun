import React from 'react';
import {AuthService} from "./auth-service";
import {PlaylistCreator} from "./playlist-creator";

export const Spotifun: React.FunctionComponent = (() => {

    const authService = new AuthService();

    return <PlaylistCreator authService={authService}/>
})