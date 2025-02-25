import { IMessage } from "./message.interface";

export interface IServiceMessagesSearchResponse {
    status: number;
    system_message: string;
    messages: IMessage[] | null;
    errors: { [key: string]: any } | null;
}