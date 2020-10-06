import {Artist} from "../models/entity-models";
import {SpotifyApi} from "../networking/spotify.api";
import {computed, observable} from "mobx";
import {Genres} from "../models/genres";
import {merge} from "lodash";

export class ArtistStore {

    private readonly MAX_SELECTION = 3;
    private readonly MIN_SELECTION = 1;

    @observable
    artistsByGenre: { [key: string]: Artist } = {};

    @observable
    selectedArtists: string[] = [];

    @observable
    isFromRecommendation = false;

    @computed
    get selectionComplete(): boolean {
        return this.selectedArtists.length >= this.MIN_SELECTION;
    }

    constructor(private readonly spotifyApi: SpotifyApi, private readonly selectedGenres: string[]) {
        this.createArtistsByGenre();
    };

    createArtistsByGenre = () => {
        this.spotifyApi.getTopArtist()
            .then((artists: Artist[]) =>
                artists.reduce((accumulator: { [key: string]: Artist }, curArtist) => {
                    for (const genre of this.selectedGenres) {
                        for (const genreId of Genres[genre].genres) {
                            if (curArtist.genres?.join(" ").includes(genreId)) {
                                accumulator[curArtist.id] = curArtist;
                            }
                        }
                    }
                    return accumulator;
                }, {}))
            .then(artistsByGenre => Object.keys(artistsByGenre).length < 10 ? this.getRecommendations(artistsByGenre) : artistsByGenre)
            .then(artistsByGenre => this.artistsByGenre = artistsByGenre);
    };

    private async getRecommendations(results: { [key: string]: Artist }): Promise<{ [key: string]: Artist }> {
        return await this.spotifyApi.getRecommendedArtistsForGenres(this.selectedGenres)
            .then((artists: Artist[]) => {
                this.isFromRecommendation = true;
                return artists.reduce((acc: { [key: string]: Artist }, artist) => {
                    acc[artist.id] = artist;
                    return acc;
                }, {});
            })
            .then(artistsByGenre => merge(results, artistsByGenre));
    }

    onItemSelect = (currArtistName: string) => {
        if (!this.artistsByGenre[currArtistName].selected && this.selectedArtists.length < this.MAX_SELECTION) {
            this.selectedArtists.push(currArtistName);
            this.artistsByGenre[currArtistName].selected = !this.artistsByGenre[currArtistName].selected;
        } else if (this.artistsByGenre[currArtistName].selected) {
            this.artistsByGenre[currArtistName].selected = !this.artistsByGenre[currArtistName].selected;
            this.selectedArtists.splice(this.selectedArtists.indexOf(currArtistName), 1);
        }
    };

}