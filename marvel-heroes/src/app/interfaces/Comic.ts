import { Thumbnail } from "./Hero"

export interface Comic{
    id:number,
    digitalId:number,
    title: string,
    description: string,
    pageCount: string
    thumbnail: Thumbnail
}