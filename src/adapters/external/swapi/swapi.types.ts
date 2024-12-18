/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISwapiCharacter {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: Date;
    edited: Date;
    url: string;
}

export interface ISwapiPlanet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: any[];
    films: string[];
    created: Date;
    edited: Date;
    url: string;
}

export interface ISwapiPersonaje {
    nombre:             string;
    altura:             string;
    masa:               string;
    color_de_cabello:   string;
    color_de_piel:      string;
    color_de_ojos:      string;
    anio_de_nacimiento: string;
    genero:             string;
    mundo_natal:        string;
    peliculas:          string;
    especies:           string;
    vehiculos:          string;
    naves_espaciales:   string;
    creado:             string;
    editado:            string;
}

export type ISwapiResponse = ISwapiCharacter & {
    planeta: ISwapiPlanet;
};