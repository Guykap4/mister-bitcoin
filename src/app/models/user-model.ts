import { Move } from "./move-model";

export interface User {
    id?: string,
    name: string,
    coins: number,
    moves: Move[],
    img: String,
}