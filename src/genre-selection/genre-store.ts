import {Genre} from "../models/Models";
import {observable} from "mobx";
import {Genres} from "../models/genres";

export class GenreStore{

    @observable
    allGenres: {[key: string]: Genre} = {...Genres};

    selectedGenres: string[] = [];

    onItemSelect = (currId: string) => {
        if (!this.allGenres[currId].selected && this.selectedGenres.length < 2) {
            this.selectedGenres.push(currId);
            this.allGenres[currId].selected = !this.allGenres[currId].selected;
        }
        else if (this.allGenres[currId].selected) {
            this.allGenres[currId].selected = !this.allGenres[currId].selected;
            const index = this.selectedGenres.indexOf(currId);
            this.selectedGenres.splice(index, 1);
        }
    };

}