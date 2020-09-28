import {Artist} from "../models/entity-models";
import {Genres} from "../models/genres";
import {convertArtistsToAppObject, shuffle} from "./networking.helper";

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

    getRecommendations = (genres?: string[], artists?: string[], retry = false): Promise<any> => {
        const baseUrl = "https://api.spotify.com/v1/recommendations";
        const spotifyGenres = genres ? this.getSpotifyGenres(genres) : undefined;
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
            .catch(() => {
                if (retry) {
                    return Promise.reject("Error getting recommendations");
                }
                return this.onTokenExpired().then(() => this.getRecommendations(genres, artists, true));
            });
    }

    getRecommendedArtistsForGenres = (genres: string[]): Promise<Artist[]> => {
        return Promise
            .all(this.getSpotifyGenres(genres).map(genre => this.search(`genre:"${genre}"`)))
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

    getQueryString = (params: { [key: string]: string[] | undefined }) => {
        const query = [];
        for (const param in params) {
            const value = params[param];
            if (value) query.push(encodeURIComponent(param) + '=' + encodeURIComponent(value.join(",")));
        }
        return query.join('&');
    }

    getSpotifyGenres = (genres: string[]) => {
        return genres.reduce((acc, cur) => acc.concat(Genres[cur].genres), [] as string[]);
    }

}
