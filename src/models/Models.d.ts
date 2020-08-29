
export class Artist {
    public genres: string[] = [];
    public id: string = "";
    public image: string[] = []; // TODO: save URL
    public name: string = "";

}

export class Genre {
    public id: stirng = "";
    public name: stirng = "";
    public genres: stirng[] = [];
    public imagePath: string = "";
    public selected: boolean;
}