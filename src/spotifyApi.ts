import {Artist} from "./models/artist";

export class SpotifyApi {

    private readonly token: string;
    private readonly onTokenRevoked: () => void;

    constructor(token: string, onTokenRevoked: () => void) {
        this.token = token;
        this.onTokenRevoked = onTokenRevoked;
    }

    getTopArtist = async () : Promise<Array<Artist>> => {
        return fetch("https://api.spotify.com/v1/me/top/artists?limit=30",
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + this.token,
                },
            }).then(response => {
            if (response.status !== 200) {
                throw "fetch unsuccessful";
            }
            return response.json();
        })
            .then(response => response.items)
            .catch(this.onTokenRevoked);
    }
}

