export enum AppStep{
    Login,
    GenresSelection,
    ArtistsSelection,
    PlaylistReview
}

export const LoginConsts = {
    authEndpoint: 'https://accounts.spotify.com/authorize',
    clientId: 'f35da0c6ac834eea9ff0ea58f245244c',
    clientSecret: CLIENT_SECRET,
    redirectUri: "http://localhost:3000",
    scopes: "user-read-currently-playing user-read-playback-state playlist-read-private playlist-read-collaborative user-top-read",
}
