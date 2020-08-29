import React, {useEffect, useState} from 'react';
import {AppStep} from "./models/app-consts";
import {LoginForm} from "./login-form";
import {GenrePicker} from "./genre-picker";
import {Genres} from './models/genres'
import {Genre} from "./models/Models";

export const Spotifun: React.FunctionComponent = (props => {
    const [step, setStep] = useState<AppStep>(AppStep.Login);
    const [token, setToken] = useState<string>( window.sessionStorage.getItem(TOKEN_STORAGE_KEY) || '');
    const [genresList, setGenresList] = useState<{[p: string] : Genre}>({...Genres});
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    useEffect(() => {
        if(token) return;
        const _token = hash.access_token;
        if (_token) {
            window.sessionStorage.setItem(TOKEN_STORAGE_KEY, _token);
            setToken(_token);
        }
    });

    const onItemSelect = (selectedItem: React.MouseEvent) => {
        const currId: string = selectedItem.currentTarget.id;
        const selectedGenresCopy = selectedGenres.splice(0);
        
        if (!genresList[currId].selected && selectedGenresCopy.length < 2) {
            selectedGenresCopy.push(currId);
            genresList[currId].selected = !genresList[currId].selected;
        }
        else if (genresList[currId].selected) {
            genresList[currId].selected = !genresList[currId].selected;
            const index = selectedGenres.indexOf(currId);
            selectedGenresCopy.splice(index, 1);
        }
        setSelectedGenres(selectedGenresCopy);
    }

    return (
        <div style={{alignItems: "center", textAlign: "center"}} >
            {
                step === AppStep.Login && <LoginForm/>
            }
            {
                step === AppStep.GenresSelection && <GenrePicker genres={genresList} onItemSelect={onItemSelect}/>
            }
        </div>
    )
})

const hash: { access_token: string } = window.location.hash.substring(1).split("&").reduce(function(hashParams, item) {
    if (item) {
        const parts = item.split("=");
        // @ts-ignore
        hashParams[parts[0]] = decodeURIComponent(parts[1]);
    }
    return hashParams;
}, { access_token : "" });

window.location.hash = "";



const TOKEN_STORAGE_KEY = "token";