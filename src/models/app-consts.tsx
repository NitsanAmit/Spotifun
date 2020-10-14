
export enum AppStep{
    GenresSelection,
    ArtistsSelection,
    PlaylistReview
}

export const LoginConsts = {
    authEndpoint: 'https://accounts.spotify.com/authorize',
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    redirectUri: "http://localhost:3000",
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


