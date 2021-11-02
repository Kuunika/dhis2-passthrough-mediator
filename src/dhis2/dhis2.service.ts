import { HttpService } from '@nestjs/axios';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, Method } from 'axios';
import { response } from 'express';
import { lastValueFrom } from 'rxjs';
import {
	API_GLOBAL_BASE_URL,
	GET_ADDRESS_INFO_NOT_FOUND,
	SERVICE_UNAVAILABLE_EXCEPTION_MESSAGE,
} from '../common/constants';

@Injectable()
export class DHIS2Service {
	constructor(
		private readonly config: ConfigService,
		private readonly httpService: HttpService,
	) { }

	async requestServiceFromDHIS2(requestMethod: Method, path: string, data?) {
		try {
			const result = await lastValueFrom(
				this.httpService.request({
					method: requestMethod,
					url: path.split(this.config.get<string>(API_GLOBAL_BASE_URL))[1],
					...(data && { data }),
				}),
			);
			return result.data;
		} catch (error) {
			this.handleError(error);
		}
	}

	private handleError(error: AxiosError) {
		if (error.message === GET_ADDRESS_INFO_NOT_FOUND) {
			throw new ServiceUnavailableException({
				statusCode: 503,
				message: SERVICE_UNAVAILABLE_EXCEPTION_MESSAGE,
			});
		}
		switch (error.response.status) {
			case 404:
				throw new NotFoundException();
			case 403:
				throw new UnauthorizedException();
			default:
				throw new BadRequestException();
		}
	}
}
