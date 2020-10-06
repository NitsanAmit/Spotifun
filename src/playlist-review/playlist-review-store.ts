import {SpotifyApi} from "../networking/spotify.api";
import {Track} from "../models/entity-models";
import {observable} from "mobx";

export class PlaylistReviewStore {

    @observable
    tracks: Track[] = [];

    @observable
    currentlyPlaying: string = '';

    @observable
    currentAudio: HTMLAudioElement | undefined;

    constructor(private readonly spotifyApi: SpotifyApi, private readonly selectedGenres: string[], private readonly selectedArtists: string[]) {
        this.init();
    }

    private init() {
        this.spotifyApi?.getRecommendations(this.selectedGenres, this.selectedArtists)
            .then((recommendations: Track[]) => {
                this.tracks = recommendations;
                this.spotifyApi.checkUserSavedTracks(recommendations.map((track: Track) => track.id)).then((saveStatuses: boolean[]) => {
                    for (let i = 0; i < saveStatuses.length; i++) {
                        this.tracks[i].inUserLibrary = saveStatuses[i];
                    }
                })
            });
    }

    toggleTrackSaveStatus = (trackId: string) => {
        const trackIndex = this.tracks.findIndex((track) => track.id === trackId);
        if (!trackIndex) return;
        let savePromise = this.tracks[trackIndex].inUserLibrary ?
            this.spotifyApi.removeFromUserLibrary(trackId) :
            this.spotifyApi.addToUserLibrary(trackId);
        savePromise
            .then(() => this.tracks[trackIndex].inUserLibrary = !this.tracks[trackIndex].inUserLibrary)
            .catch(() => alert("Save / remove song from library failed."));
    };

    playPreview(audio: HTMLAudioElement, trackId: string) {
        if (this.currentlyPlaying === trackId){
            if(!this.currentAudio){
                this.currentAudio = audio;
            }
            if (!this.currentAudio.paused && !this.currentAudio.ended) return this.currentAudio.pause();
        }else{
            if(this.currentAudio && !this.currentAudio.paused){
                this.currentAudio.pause();
            }
            this.currentlyPlaying = trackId;
            this.currentAudio = audio;
        }
        this.currentAudio.play();
    }
}