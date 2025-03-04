import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "./services/guards/jwt.guard";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";
import { CreateJobResponseDto } from "./interfaces/job/dto/create-job-response.dto";
import { CreateJobDto } from "./interfaces/job/dto/create-job.dto";
import { DeleteJobResponseDto } from "./interfaces/job/dto/delete-job-response.dto";
import { GetJobsResponseDto } from "./interfaces/job/dto/get-jobs-response.dto";
import { UpdateJobResponseDto } from "./interfaces/job/dto/update-job-response.dto";
import { UpdateJobDto } from "./interfaces/job/dto/update-job.dto";
import { GetJobResponseDto } from "./interfaces/job/dto/get-job-response.dto";
import { IJobSearchResponse, IJobsSearchResponse, IJobCreateResponse, IJobUpdateResponse, IJobDeleteResponse } from "@rudinesurya/jobs-service-interfaces";

@Controller('jobs')
@ApiTags('jobs')
export class JobsController {
    constructor(
        @Inject('JOBS_SERVICE') private readonly jobsServiceClient: ClientProxy,
    ) { }

    @Get('/:id')
    @ApiOkResponse({
        type: GetJobResponseDto,
    })
    public async getJobById(
        @Param('id') id: string,
    ): Promise<GetJobResponseDto> {
        const response: IJobSearchResponse = await firstValueFrom(
            this.jobsServiceClient.send('job_get_by_id', { id }),
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
                job: response.job,
            },
            errors: null,
        };
    }

    @Get()
    @ApiOkResponse({
        type: GetJobsResponseDto,
    })
    public async getJobs(): Promise<GetJobsResponseDto> {
        const response: IJobsSearchResponse = await firstValueFrom(
            this.jobsServiceClient.send('jobs_get', {}),
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
                jobs: response.jobs,
            },
            errors: null,
        };
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({
        type: CreateJobResponseDto,
    })
    public async createJob(
        @Req() request: IAuthorizedRequest,
        @Body() body: CreateJobDto,
    ): Promise<CreateJobResponseDto> {
        const response: IJobCreateResponse = await firstValueFrom(
            this.jobsServiceClient.send('job_create', { createData: { posted_by: request.user._id, ...body } }),
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
                job: response.job,
            },
            errors: null,
        };
    }

    @Put('/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateJobResponseDto,
    })
    public async updateJob(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest,
        @Body() body: UpdateJobDto,
    ): Promise<UpdateJobResponseDto> {
        const response: IJobUpdateResponse = await firstValueFrom(
            this.jobsServiceClient.send('job_update', { id, userId: request.user._id, updateData: body }),
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
                job: response.job,
            },
            errors: null,
        };
    }

    @Delete('/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: DeleteJobResponseDto,
    })
    public async deleteJob(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest,
    ): Promise<DeleteJobResponseDto> {
        const response: IJobDeleteResponse = await firstValueFrom(
            this.jobsServiceClient.send('job_delete_by_id', {
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