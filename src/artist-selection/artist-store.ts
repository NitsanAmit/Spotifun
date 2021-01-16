import {Artist} from "../models/entity-models";
import {SpotifyApi} from "../networking/spotify.api";
import {computed, observable} from "mobx";
import {Genres} from "../models/genres";

const MINIMUM_ARTISTS_PER_GENRE = 14;

export class ArtistStore {

    private readonly MAX_SELECTION = 3;
    private readonly MIN_SELECTION = 1;

    @observable
    suggestedArtists: { [artistId: string]: Artist } = {}

    @observable
    selectedArtists: string[] = [];

    @observable
    isFromRecommendation = false;

    @observable
    tracksLimit = 20;

    @computed
    get selectionComplete(): boolean {
        return this.selectedArtists.length >= this.MIN_SELECTION;
    }

    constructor(private readonly spotifyApi: SpotifyApi, private readonly selectedGenres: string[]) {
        this.createArtistsByGenre();
    };

    createArtistsByGenre = () => {
        this.spotifyApi.getTopArtist()
            .then((artists: Artist[]) => {
                const needRecommendations = [];
                for (const genre of this.selectedGenres) {
                    let artistsMatchingGenreCount = 0;
                    for (const genreId of Genres[genre].genres) {
                        artists
                            .filter(curArtist => curArtist.genres?.join(" ").includes(genreId))
                            .forEach(curArtist => {
                                this.suggestedArtists[curArtist.id] = curArtist;
                                artistsMatchingGenreCount++;
                            });
                    }
                    if (artistsMatchingGenreCount < MINIMUM_ARTISTS_PER_GENRE) {
                        needRecommendations.push(genre);
                    }
                }
                return this.getGenreRecommendations(needRecommendations);
            });
    };

    private async getGenreRecommendations(genres: string[]): Promise<void> {
        if (!genres?.length) return;
        await this.spotifyApi.getRecommendedArtistsForGenres(genres)
            .then((artists: Artist[]) => {
                this.isFromRecommendation = true;
                artists.forEach(curArtist => this.suggestedArtists[curArtist.id] = curArtist);
            });
    }

    onItemSelect = (artistId: string) => {
        if (!this.suggestedArtists[artistId].selected && this.selectedArtists.length < this.MAX_SELECTION) {
            this.selectedArtists.push(artistId);
            this.suggestedArtists[artistId].selected = !this.suggestedArtists[artistId].selected;
        } else if (this.suggestedArtists[artistId].selected) {
            this.suggestedArtists[artistId].selected = !this.suggestedArtists[artistId].selected;
            this.selectedArtists.splice(this.selectedArtists.indexOf(artistId), 1);
        }
    };

}