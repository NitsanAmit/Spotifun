import {Artist, Track} from "../models/entity-models";
import {Genres} from "../models/genres";
import {convertArtistsToAppObject, convertTracksToAppObject, shuffle} from "./networking.helper";

export class SpotifyApi {

    private readonly token: string;
    private readonly onTokenExpired: () => Promise<void>;

    constructor(token: string, onTokenExpired: () => Promise<void>) {
        this.token = token;
        this.onTokenExpired = onTokenExpired;
    }

    getTopArtist = (retry = false): Promise<Artist[]> => {
        return fetch("https://api.spotify.com/v1/me/top/artists?limit=50",
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + this.token,
                },
            })
            .then(response => {
                if (response.status !== 200) {
                    throw "fetch unsuccessful";
                }
                return response.json();
            })
            .then(response => response.items)
            .then((items) => convertArtistsToAppObject(items))
            .catch(() => {
                if (retry) {
                    return Promise.reject("Error fetching top artists");
                }
                return this.onTokenExpired().then(() => this.getTopArtist(true));
            });
    }

    getRecommendations = (genres?: string[], artists?: string[], retry = false): Promise<Track[]> => {
        const baseUrl = "https://api.spotify.com/v1/recommendations";
        const spotifyGenres = genres ? this.getSpotifyGenres(genres, true) : undefined;
        const queryParams = this.getQueryString({"seed_genres": spotifyGenres, "seed_artists": artists});
        return fetch(`${baseUrl}?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + this.token,
                },
            })
            .then(response => {
                if (response.status !== 200) {
                    throw "fetch unsuccessful";
                }
                return response.json();
            })
            .then(response => response.tracks)
            .then((tracks) => convertTracksToAppObject(tracks))
            .catch(() => {
                if (retry) {
                    return Promise.reject("Error getting recommendations");
                }
                return this.onTokenExpired().then(() => this.getRecommendations(genres, artists, true));
            });
    }

    getRecommendedArtistsForGenres = (genres: string[]): Promise<Artist[]> => {
        const searchPromises = this.getSpotifyGenres(genres).map(genre => this.search(`genre:"${genre}"`));
        return Promise
            .all(searchPromises)
            .then((response: Artist[][]) => convertArtistsToAppObject(shuffle(response.flat(1))));
    }

    search = (query: string): Promise<Artist[]> => {
        const baseUrl = "https://api.spotify.com/v1/search?type=artist&q=";
        return fetch(`${baseUrl}${query}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + this.token,
                },
            })
            .then(response => {
                if (response.status !== 200) {
                    throw "fetch unsuccessful";
                }
                return response.json();
            })
            .then(response => response.artists.items);
    }

    getQueryString = (params: { [key: string]: string[] | undefined }): string => {
        const query = [];
        for (const param in params) {
            const value = params[param];
            if (value) query.push(encodeURIComponent(param) + '=' + encodeURIComponent(value.join(",")));
        }
        return query.join('&');
    }

    getSpotifyGenres = (genres: string[], trim = false): string[] => {
        return genres.reduce((acc, cur) => {
            const spotifyGenres = Genres[cur].genres;
            if (trim) {
                return acc.concat([spotifyGenres[0]]); // only take the first genre
            } else {
                return acc.concat(spotifyGenres);
            }
        }, [] as string[]);
    }

    checkUserSavedTracks = (tracksIds: string[]): Promise<boolean[]> => {
        const baseUrl = "https://api.spotify.com/v1/me/tracks/contains";
        const queryParams = this.getQueryString({"ids": tracksIds});
        return fetch(`${baseUrl}?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + this.token,
                },
            })
            .then(response => {
                if (response.status !== 200) {
                    throw "fetch unsuccessful";
                }
                return response.json();
            });
    }

    removeFromUserLibrary = (trackId: string): Promise<void> => {
        return this.changeSaveStatus(trackId, 'DELETE');
    }

    addToUserLibrary = (trackId: string): Promise<void> => {
        return this.changeSaveStatus(trackId, 'PUT');
    }

    changeSaveStatus = (trackId: string, method: 'PUT' | 'DELETE'): Promise<void> => {
        const baseUrl = "https://api.spotify.com/v1/me/tracks";
        const queryParams = this.getQueryString({"ids": [trackId]});
        return fetch(`${baseUrl}?${queryParams}`,
            {
                method,
                headers: {
                    'Authorization': "Bearer " + this.token,
                },
            })
            .then(response => {
                if (response.status !== 200) {
                    throw "fetch unsuccessful";
                }
            });
    }


}
