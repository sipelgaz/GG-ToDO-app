import { IBaseEntity } from "./IBaseEntity";
import dayjs from "dayjs";

export interface ITask extends IBaseEntity {
    title: string,
    description: string,
    location: string,
    date: dayjs.Dayjs,
    completed: boolean,
}