export interface Hero {
    id?: number,
    name: string,
    description: string,
    thumbnail: Thumbnail,
    comics: Comics;
}

interface Comics{
    items:[{
        resourceURI: string,
        name: string
    }]
}

export interface Thumbnail {
    path: string,
    extension: string
}

export interface IHeroesSearch {
    search: string;
    page: number;
    limit: number;
}