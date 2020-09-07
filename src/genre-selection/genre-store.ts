import {Genre} from "../models/entity-models";
import {computed, observable} from "mobx";
import {Genres} from "../models/genres";

export class GenreStore {

    private readonly REQUIRED_SELECTION = 2;

    @observable
    allGenres: { [key: string]: Genre } = {...Genres};

    @observable
    selectedGenres: string[] = [];

    @computed
    get selectionComplete(): boolean {
        return this.selectedGenres.length === this.REQUIRED_SELECTION;
    }

    public onItemSelect = (currId: string) => {
        if (!this.allGenres[currId].selected && this.selectedGenres.length < this.REQUIRED_SELECTION) {
            this.selectedGenres.push(currId);
            this.allGenres[currId].selected = !this.allGenres[currId].selected;
        } else if (this.allGenres[currId].selected) {
            this.allGenres[currId].selected = !this.allGenres[currId].selected;
            const index = this.selectedGenres.indexOf(currId);
            this.selectedGenres.splice(index, 1);
        }
    };

}

