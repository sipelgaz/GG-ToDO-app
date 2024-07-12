import { IBaseEntity } from "./IBaseEntity";

export interface IUser extends IBaseEntity {
    name: string,
    email: string,
    isAdmin: boolean
}