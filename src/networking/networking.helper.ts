import {Artist, Track, User} from "../models/entity-models";
import {happy} from "../static-resources/icons";

export const convertArtistsToAppObject = (items: ArtistDTO[]): Artist[] => {
    return items.map((artist: ArtistDTO) => (
        {
            name: artist.name,
            id: artist.id,
            image: (artist.images && artist.images[0]?.url) || null,
            genres: artist.genres,
            externalUrl: artist.external_urls?.spotify,
        } as Artist
    ));
};

export const convertTracksToAppObject = (tracks: TrackDTO[]): Track[] => {
    return tracks.map((track: TrackDTO) => (
        {
            id: track.id,
            name: track.name,
            album: {
                id: track.album.id,
                name: track.album.name,
                image: track.album.images[2]?.url || track.album.images[1]?.url || track.album.images[0]?.url,
                externalUrl: track.album.external_urls.spotify,
            },
            artists: convertArtistsToAppObject(track.artists),
            duration: track.duration_ms,
            externalUrl: track.external_urls.spotify,
            previewUrl: track.preview_url,
            uri: track.uri,
        } as Track
    ));
};

export const convertUserToAppObject = (user: userDTO): User => {
    return {
        id: user.id,
        name: user.display_name,
        image: user.images?.length ? user.images[0].url : happy,
    };
};

export const shuffle = (list: any[]) => {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

interface ArtistDTO {
    id: string;
    name: string;
    images?: { url: string }[];
    genres?: string[];
    external_urls?: { spotify: string };
    href?: string;
}

interface TrackDTO {
    id: string;
    name: string;
    album: AlbumDTO;
    artists: ArtistDTO[];
    duration_ms: number;
    external_urls: { spotify: string };
    preview_url: string;
    uri: string;
}

interface AlbumDTO {
    id: string;
    name: string;
    external_urls: { spotify: string };
    images: { url: string }[];
}

interface userDTO {
    id: string;
    display_name: string;
    images: { url: string }[];
}