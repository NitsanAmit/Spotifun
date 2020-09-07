
export interface Artist {
    id: string;
    name: string;
    genres: string[];
    image: string;
    selected: boolean;
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
    artists: {
        link: string;
        name: string;
        href: string;
    }[];
    image: string;
    albumName: string;
}

