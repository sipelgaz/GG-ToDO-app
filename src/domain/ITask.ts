import { IBaseEntity } from "./IBaseEntity";

export interface ITask extends IBaseEntity {
    title: string,
    description: string,
    location: string
}