import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "./services/guards/jwt.guard";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";
import { CreateApplicationResponseDto } from "./interfaces/application/dto/create-application-response.dto";
import { CreateApplicationDto } from "./interfaces/application/dto/create-application.dto";
import { DeleteApplicationResponseDto } from "./interfaces/application/dto/delete-application-response.dto";
import { GetApplicationResponseDto } from "./interfaces/application/dto/get-application-response.dto";
import { UpdateApplicationResponseDto } from "./interfaces/application/dto/update-application-response.dto";
import { UpdateApplicationDto } from "./interfaces/application/dto/update-application.dto";
import { GetApplicationsResponseDto } from "./interfaces/application/dto/get-applications-response.dto";
import { IApplicationSearchResponse, IApplicationsSearchResponse, IApplicationCreateResponse, IApplicationUpdateResponse } from "@rudinesurya/applications-service-interfaces";
import { IJobDeleteResponse } from "@rudinesurya/jobs-service-interfaces";

@Controller('applications')
@ApiTags('applications')
export class ApplicationsController {
    constructor(
        @Inject('APPLICATIONS_SERVICE') private readonly applicationsServiceClient: ClientProxy,
    ) { }

    @Get('/:id')
    @ApiOkResponse({
        type: GetApplicationResponseDto,
    })
    public async getApplicationById(
        @Param('id') id: string,
    ): Promise<GetApplicationResponseDto> {
        const response: IApplicationSearchResponse = await firstValueFrom(
            this.applicationsServiceClient.send('application_get_by_id', { id }),
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
                application: response.application,
            },
            errors: null,
        };
    }

    @Get('/job/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: GetApplicationsResponseDto,
    })
    public async getApplicationsByJobId(
        @Req() request: IAuthorizedRequest,
        @Param('id') id: string,
    ): Promise<GetApplicationsResponseDto> {
        const response: IApplicationsSearchResponse = await firstValueFrom(
            this.applicationsServiceClient.send('applications_get_by_job_id', { id }),
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
                applications: response.applications,
            },
            errors: null,
        };
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({
        type: CreateApplicationResponseDto,
    })
    public async createApplication(
        @Req() request: IAuthorizedRequest,
        @Body() body: CreateApplicationDto,
    ): Promise<CreateApplicationResponseDto> {
        const response: IApplicationCreateResponse = await firstValueFrom(
            this.applicationsServiceClient.send('application_create', { createData: { applicant: request.user._id, ...body } }),
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
                application: response.application,
            },
            errors: null,
        };
    }

    @Put('/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateApplicationResponseDto,
    })
    public async updateApplication(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest,
        @Body() body: UpdateApplicationDto,
    ): Promise<UpdateApplicationResponseDto> {
        const response: IApplicationUpdateResponse = await firstValueFrom(
            this.applicationsServiceClient.send('application_update', { id, userId: request.user._id, updateData: body }),
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
                application: response.application,
            },
            errors: null,
        };
    }

    @Delete('/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: DeleteApplicationResponseDto,
    })
    public async deleteApplication(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest,
    ): Promise<DeleteApplicationResponseDto> {
        const response: IJobDeleteResponse = await firstValueFrom(
            this.applicationsServiceClient.send('application_delete_by_id', {
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