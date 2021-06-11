
export enum AppStep{
    GenresSelection,
    ArtistsSelection,
    PlaylistReview
}

export const LoginConsts = {
    authEndpoint: 'https://accounts.spotify.com/authorize',
    clientId: 'f35da0c6ac834eea9ff0ea58f245244c',
    redirectUri: "https://spotifun-d2f93.firebaseapp.com/",
    scopes: `
        user-read-currently-playing
        user-read-recently-played
        user-read-playback-state
        playlist-read-private
        playlist-read-collaborative
        playlist-modify-private
        playlist-modify-public
        user-top-read
        user-library-read
        user-library-modify
    `,
}


