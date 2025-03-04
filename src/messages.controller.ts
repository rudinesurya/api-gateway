import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "./services/guards/jwt.guard";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";
import { CreateMessageResponseDto } from "./interfaces/message/dto/create-message-response.dto";
import { CreateMessageDto } from "./interfaces/message/dto/create-message.dto";
import { DeleteMessageResponseDto } from "./interfaces/message/dto/delete-message-response.dto";
import { GetMessagesResponseDto } from "./interfaces/message/dto/get-messages-response.dto";
import { UpdateMessageResponseDto } from "./interfaces/message/dto/update-message-response.dto";
import { UpdateMessageDto } from "./interfaces/message/dto/update-message.dto";
import { IJobDeleteResponse } from "@rudinesurya/jobs-service-interfaces";
import { IMessagesSearchResponse, IMessageCreateResponse, IMessageUpdateResponse } from "@rudinesurya/messages-service-interfaces";

@Controller('messages')
@ApiTags('messages')
export class MessagesController {
    constructor(
        @Inject('MESSAGES_SERVICE') private readonly messagesServiceClient: ClientProxy,
    ) { }

    @Get('/chat/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: GetMessagesResponseDto,
    })
    public async getMessagesByChatId(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest
    ): Promise<GetMessagesResponseDto> {
        const response: IMessagesSearchResponse = await firstValueFrom(
            this.messagesServiceClient.send('messages_get_by_chat_id', { id }),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: {
                messages: response.messages,
            },
            errors: null,
        };
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({
        type: CreateMessageResponseDto,
    })
    public async createMessage(
        @Req() request: IAuthorizedRequest,
        @Body() body: CreateMessageDto,
    ): Promise<CreateMessageResponseDto> {
        const response: IMessageCreateResponse = await firstValueFrom(
            this.messagesServiceClient.send('message_create', { createData: { sender: request.user._id, ...body } }),
        );

        if (response.status !== HttpStatus.CREATED) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: {
                message: response.message,
            },
            errors: null,
        };
    }

    @Put('/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateMessageResponseDto,
    })
    public async updateMessage(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest,
        @Body() body: UpdateMessageDto,
    ): Promise<UpdateMessageResponseDto> {
        const response: IMessageUpdateResponse = await firstValueFrom(
            this.messagesServiceClient.send('message_update', { id, userId: request.user._id, updateData: body }),
        );
        
        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: {
                message: response.message,
            },
            errors: null,
        };
    }

    @Delete('/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: DeleteMessageResponseDto,
    })
    public async deleteMessage(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest,
    ): Promise<DeleteMessageResponseDto> {
        const response: IJobDeleteResponse = await firstValueFrom(
            this.messagesServiceClient.send('message_delete_by_id', {
                id,
                userId: request.user._id,
            }),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    errors: response.errors,
                    data: null,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: null,
            errors: null,
        };
    }
}