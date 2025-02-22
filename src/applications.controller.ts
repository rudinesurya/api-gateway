import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "./services/guards/jwt.guard";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";

@Controller('applications')
@ApiTags('applications')
export class ApplicationsController {
    constructor(
        @Inject('APPLICATIONS_SERVICE') private readonly applicationsServiceClient: ClientProxy,
    ) { }

    
}