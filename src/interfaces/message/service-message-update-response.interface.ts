import { IMessage } from "./message.interface";

export interface IServiceMessageUpdateResponse {
    status: number;
    message: string;
    message: IMessage | null;
    errors: { [key: string]: any };
}