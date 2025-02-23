import { IMessage } from "./message.interface";

export interface IServiceMessageCreateResponse {
    status: number;
    system_message: string;
    message: IMessage | null;
    errors: { [key: string]: any };
}