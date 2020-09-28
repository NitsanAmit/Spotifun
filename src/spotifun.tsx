import React from 'react';
import {AuthService} from "./networking/auth-service";
import {PlaylistCreator} from "./playlist-creator";
import {DeclaredStrings, LocaleService} from "./i18n/locale-service";

export const Spotifun: React.FunctionComponent<SpotifunProps> = (({localeService, authService}) =>
    <LocaleContext.Provider value={localeService.strings}>
        {
            Object.keys(localeService.strings).length !== 0 &&
            <PlaylistCreator authService={authService}/>
        }
    </LocaleContext.Provider>)

interface SpotifunProps {
    localeService: LocaleService;
    authService: AuthService;
}

export const LocaleContext = React.createContext<DeclaredStrings>({} as DeclaredStrings);