import {Artist} from "../models/entity-models";
import {SpotifyApi} from "../spotify.api";
import {computed, observable} from "mobx";

export class ArtistStore{

    private readonly REQUIRED_SELECTION = 3;

    spotifyApi: SpotifyApi;

    selectedGenres: string[];

    @observable
    artistsByGenre: {[key: string] : Artist} = {};

    @observable
    selectedArtists: string[] = [];

    @computed
    get selectionComplete(): boolean {
        return this.selectedArtists.length === this.REQUIRED_SELECTION;
    }

    constructor(spotifyApi: SpotifyApi, selectedGenre: string[]) {
        this.spotifyApi = spotifyApi;
        this.selectedGenres = selectedGenre;
        this.createArtistsByGenre();
    };

    setArtistsByGenre = (newList: {[key: string] : Artist}) => {
        this.artistsByGenre = newList;
        console.log(this.artistsByGenre);
    };

    createArtistsByGenre = () => {
        this.spotifyApi.getTopArtist()
            .then((artists: Artist[]) =>
                artists.reduce((accumulator: { [key: string]: Artist }, curArtist) => {
                    for (const genre of this.selectedGenres) {
                        if (curArtist.genres.includes(genre)) accumulator[curArtist.id] = curArtist;
                    }
                    return accumulator;
                }, {}))
            .then(artistsByGenre => this.setArtistsByGenre(artistsByGenre))
    };

    onItemSelect = (currArtistName: string) => {
        if (!this.artistsByGenre[currArtistName].selected && this.selectedArtists.length < this.REQUIRED_SELECTION) {
            this.selectedArtists.push(currArtistName);
            this.artistsByGenre[currArtistName].selected = !this.artistsByGenre[currArtistName].selected;
        }
        else if (this.artistsByGenre[currArtistName].selected) {
            this.artistsByGenre[currArtistName].selected = !this.artistsByGenre[currArtistName].selected;
            const index = this.selectedArtists.indexOf(currArtistName);
            this.selectedArtists.splice(index, 1);
        }
    };

}