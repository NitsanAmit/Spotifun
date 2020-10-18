import {Artist, Track, User} from "../models/entity-models";
import {Genres} from "../models/genres";
import {
    convertArtistsToAppObject,
    convertTracksToAppObject,
    convertUserToAppObject,
    shuffle
} from "./networking.helper";

export class SpotifyApi {

    private readonly token: string;
    private readonly onTokenExpired: () => Promise<void>;

    constructor(token: string, onTokenExpired: () => Promise<void>) {
        this.token = token;
        this.onTokenExpired = onTokenExpired;
    }

    getUserDetails = async (retry = false): Promise<User> => {
        try {
            const user = await fetch("https://api.spotify.com/v1/me", this.getHeaders())
                .then(this.readResponse)
                .then(user => convertUserToAppObject(user));
            const recentlyPlayed = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", this.getHeaders())
                .then(this.readResponse)
                .then(response => response.items[0].track)
                .then(track => convertTracksToAppObject([track])[0]);

            return {
                ...user,
                recentlyPlayed
            }
        } catch (e) {
            if (retry) {
                return Promise.reject("Error fetching top artists");
            }
            return this.onTokenExpired().then(() => this.getUserDetails(true));
        }
    }

    getTopArtist = (retry = false): Promise<Artist[]> => {
        return fetch("https://api.spotify.com/v1/me/top/artists?limit=50", this.getHeaders())
            .then(this.readResponse)
            .then(response => response.items)
            .then((items) => convertArtistsToAppObject(items))
            .catch(() => {
                if (retry) {
                    return Promise.reject("Error fetching top artists");
                }
                return this.onTokenExpired().then(() => this.getTopArtist(true));
            });
    }

    getRecommendations = (limit: number, genres?: string[], artists?: string[], retry = false): Promise<Track[]> => {
        const baseUrl = "https://api.spotify.com/v1/recommendations";
        const spotifyGenres = genres ? this.getSpotifyGenres(genres, true) : undefined;
        const queryParams = this.getQueryString({"seed_genres": spotifyGenres, "seed_artists": artists});
        return fetch(`${baseUrl}?${queryParams}&limit=${limit}`, this.getHeaders())
            .then(this.readResponse)
            .then(response => response.tracks)
            .then((tracks) => convertTracksToAppObject(tracks))
            .catch(() => {
                if (retry) {
                    return Promise.reject("Error getting recommendations");
                }
                return this.onTokenExpired().then(() => this.getRecommendations(limit, genres, artists, true));
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
        return fetch(`${baseUrl}${query}`, this.getHeaders())
            .then(this.readResponse)
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
        return fetch(`${baseUrl}?${queryParams}`, this.getHeaders()).then(this.readResponse);
    }

    removeFromUserLibrary = (trackId: string): Promise<void> => {
        return this.changeSaveStatus(trackId, 'DELETE');
    }

    addToUserLibrary = (trackId: string): Promise<void> => {
        return this.changeSaveStatus(trackId, 'PUT');
    }

    private changeSaveStatus = (trackId: string, method: 'PUT' | 'DELETE'): Promise<void> => {
        const baseUrl = "https://api.spotify.com/v1/me/tracks";
        const queryParams = this.getQueryString({"ids": [trackId]});
        return fetch(`${baseUrl}?${queryParams}`, this.getHeaders(method))
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("fetch unsuccessful");
                }
            });
    }

    createPlaylist = async (trackUris: string[], userId: string, playlistName: string, retry = false): Promise<void> => {
        try {
            const playlist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    ...this.getHeaders().headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playlistName,
                    description: 'Auto-generated playlist by Spotifun',
                }),
            }).then(this.readResponse);

            await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                method: 'POST',
                headers: {
                    ...this.getHeaders().headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({uris: trackUris}),
            }).then(this.readResponse);

        } catch (e) {
            if (retry) {
                return Promise.reject("Error creating playlist");
            }
            return this.onTokenExpired().then(() => this.createPlaylist(trackUris, userId, playlistName, true));
        }
    }

    private getHeaders = (method = 'GET') => ({
        method,
        headers: {'Authorization': "Bearer " + this.token}
    });

    private readResponse = (response: Response) => {
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("fetch unsuccessful");
        }
        return response.json();
    }

}
