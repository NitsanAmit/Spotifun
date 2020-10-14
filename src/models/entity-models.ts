
export interface Artist {
    id: string;
    name: string;
    genres?: string[];
    image?: string;
    selected?: boolean;
    apiUrl?: string;
    externalUrl?: string;
}

export interface Genre {
    id: string;
    name: string;
    genres: string[];
    image: string;
    selected: boolean;
}

export interface Track {
    id: string;
    name: string;
    album: Album;
    artists: Artist[];
    duration: number;
    externalUrl: string;
    previewUrl: string;
    inUserLibrary?: boolean;
    uri: string;
}

export interface Album {
    id: string;
    name: string;
    image: string;
    externalUrl: string;
}

export interface User {
    id: string;
    name: string;
    image: string;
    recentlyPlayed?: Track;
}
