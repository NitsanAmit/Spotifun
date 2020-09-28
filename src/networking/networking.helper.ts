import {Artist} from "../models/entity-models";
import {indie} from "../icons";

export const convertArtistsToAppObject = (items: any[]) => {
    return items.map((artist: ArtistDTO) => (
        {
            name: artist.name,
            id: artist.id,
            image: artist.images[0]?.url || indie,
            genres: artist.genres,
        } as Artist
    ));
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
    images: { url: string }[];
    genres: string[];
}

interface PlaylistDTO {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
}
