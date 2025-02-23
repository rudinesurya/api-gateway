import { IMessage } from "./message.interface";

export interface IServiceMessageCreateResponse {
    status: number;
    message: string;
    message: IMessage | null;
    errors: { [key: string]: any };
}