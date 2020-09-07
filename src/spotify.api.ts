import {Artist, Track} from "./models/entity-models";

export class SpotifyApi {

    private readonly token: string;
    private readonly onTokenExpired: () => Promise<void>;

    constructor(token: string, onTokenExpired: () => Promise<void>) {
        this.token = token;
        this.onTokenExpired = onTokenExpired;
    }

    getTopArtist = (): Promise<Array<Artist>> => {
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
            .then((items: ArtistDTO[]) => items.map((artist: ArtistDTO) => {
                return {
                    name: artist.name,
                    id: artist.id,
                    image: artist.images[0].url,
                    genres: artist.genres,
                } as Artist;
            }))
            .catch(() => this.onTokenExpired().then(() => this.getTopArtist()));
    }

    testGetRecommendations = (genres: string[]): Promise<any> => {
        return fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genres.join(",")}`,
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
            .then((items: Track[]) => {
                console.log(items);
                return items;
            })
    }
}

interface ArtistDTO {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
}

interface PlaylistDTO {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
}