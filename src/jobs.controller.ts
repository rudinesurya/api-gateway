import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "./services/guards/jwt.guard";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";
import { UpdateUserRatingResponseDto } from "./interfaces/user-rating/dto/update-user-rating-response.dto";
import { DeleteUserRatingResponseDto } from "./interfaces/user-rating/dto/delete-user-rating-response.dto";
import { CreateJobResponseDto } from "./interfaces/job/dto/create-job-response.dto";
import { CreateJobDto } from "./interfaces/job/dto/create-job.dto";
import { DeleteJobResponseDto } from "./interfaces/job/dto/delete-job-response.dto";
import { GetJobsResponseDto } from "./interfaces/job/dto/get-jobs-response.dto";
import { UpdateJobResponseDto } from "./interfaces/job/dto/update-job-response.dto";
import { UpdateJobDto } from "./interfaces/job/dto/update-job.dto";
import { IServiceJobCreateResponse } from "./interfaces/job/service-job-create-response.interface";
import { IServiceJobDeleteResponse } from "./interfaces/job/service-job-delete-response.interface";
import { IServiceJobUpdateResponse } from "./interfaces/job/service-job-update-response.interface";
import { IServiceJobsSearchResponse } from "./interfaces/job/service-jobs-search-response.interface";
import { IServiceJobSearchResponse } from "./interfaces/job/service-job-search-response.interface";
import { GetJobResponseDto } from "./interfaces/job/dto/get-job-response.dto";

@Controller('jobs')
@ApiTags('jobs')
export class JobsController {
    constructor(
        @Inject('JOBS_SERVICE') private readonly jobsServiceClient: ClientProxy,
    ) { }

    @Get('/:jobId')
    @ApiOkResponse({
        type: GetJobResponseDto,
    })
    public async getJobById(
        @Param('jobId') jobId: string,
    ): Promise<GetJobResponseDto> {
        const response: IServiceJobSearchResponse = await firstValueFrom(
            this.jobsServiceClient.send('job_get_by_id', { jobId }),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: response.message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            message: response.message,
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
        const response: IServiceJobsSearchResponse = await firstValueFrom(
            this.jobsServiceClient.send('jobs_get', {}),
        );

        return {
            message: response.message,
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
        @Body() jobParams: CreateJobDto,
    ): Promise<CreateJobResponseDto> {
        const response: IServiceJobCreateResponse = await firstValueFrom(
            this.jobsServiceClient.send('job_create', { postedBy: request.user.id, ...jobParams }),
        );
        if (response.status !== HttpStatus.CREATED) {
            throw new HttpException(
                {
                    message: response.message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            message: response.message,
            data: {
                job: response.job,
            },
            errors: null,
        };
    }

    @Put('/:jobId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateUserRatingResponseDto,
    })
    public async updateJob(
        @Param('jobId') jobId: string,
        @Req() request: IAuthorizedRequest,
        @Body() updateData: UpdateJobDto,
    ): Promise<UpdateJobResponseDto> {
        const response: IServiceJobUpdateResponse = await firstValueFrom(
            this.jobsServiceClient.send('job_update', { jobId, postedById: request.user.id, updateData }),
        );
        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: response.message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            message: response.message,
            data: {
                job: response.job,
            },
            errors: null,
        };
    }

    @Delete('/:jobId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: DeleteUserRatingResponseDto,
    })
    public async deleteUserRating(
        @Param('jobId') jobId: string,
        @Req() request: IAuthorizedRequest,
    ): Promise<DeleteJobResponseDto> {
        const response: IServiceJobDeleteResponse = await firstValueFrom(
            this.jobsServiceClient.send('job_delete_by_id', {
                jobId,
                postedById: request.user.id,
            }),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: response.message,
                    errors: response.errors,
                    data: null,
                },
                response.status,
            );
        }

        return {
            message: response.message,
            data: null,
            errors: null,
        };
    }
}