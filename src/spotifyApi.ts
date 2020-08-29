import {Artist} from "./models/Models";

export class SpotifyApi {

    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }

    onTokenRevoked = () => {
        window.sessionStorage.clear();
    };

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

