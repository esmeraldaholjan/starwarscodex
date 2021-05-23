export interface IFilm {
    title: string;
    characters: [];
    created: string;
    director: string;
    edited: string;
    episode_id: number;
    opening_crawl: string;
    producer: string;
    release_date: string;
    url: string;
}

export class FilmInfo {
    title: string;
    characters: [];
    created: string;
    director: string;
    edited: string;
    episodeID: number;
    openingCrawl: string;
    producer: string;
    releaseDate: string;
    url: string;

    constructor(props?: IFilm) {
        if (!props) { return this; }

        this.title = props.title;
        this.characters = props.characters;
        this.created = props.created;
        this.edited = props.edited;
        this.director = props.director;
        this.episodeID = props.episode_id;
        this.openingCrawl = props.opening_crawl;
        this.producer = props.producer;
        this.releaseDate = props.release_date;
        this.url = props.url;
    }
}
