import { IMessage } from "./message.interface";

export interface IServiceMessagesSearchResponse {
    status: number;
    message: string;
    messages: IMessage[] | null;
}