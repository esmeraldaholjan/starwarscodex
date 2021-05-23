export interface ICharacter {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    films: [];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: [];
    starships: [];
    url: string;
    vehicles: [];
}

export class CharacterInfo {
    birthYear: string;
    created: string;
    edited: string;
    eyeColor: string;
    films: [];
    gender: string;
    hairColor: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skinColor: string;
    species: [];
    starships: [];
    url: string;
    vehicles: [];

    constructor(props?: ICharacter) {
        if (!props) { return this; }

        this.birthYear = props.birth_year;
        this.created = props.created;
        this.edited = props.edited;
        this.eyeColor = props.eye_color;
        this.films = props.films;
        this.gender = props.gender;
        this.hairColor = props.hair_color;
        this.height = props.height;
        this.homeworld = props.homeworld;
        this.mass = props.mass;
        this.name = props.name;
        this.skinColor = props.skin_color;
        this.species = props.species;
        this.starships = props.starships;
        this.url = props.url;
        this.vehicles = props.vehicles;
    }
}
