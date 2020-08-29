import {Artist} from "./models/Models";

export class SpotifyApi {

    private readonly token: string;
    private readonly onTokenExpired: () => Promise<void>;

    constructor(token: string, onTokenExpired: () => Promise<void>) {
        this.token = token;
        this.onTokenExpired = onTokenExpired;
    }

    getTopArtist = async () : Promise<Array<Artist>> => {
        try{
            return await fetch("https://api.spotify.com/v1/me/top/artists?limit=30",
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
                .then(response => response.items);
        }catch{
            return this.onTokenExpired().then(()=> this.getTopArtist());
        }
    }
}

