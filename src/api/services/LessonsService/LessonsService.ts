import {Api} from '../../Api';
import {
    CreateLessonPayload,
    CreateLessonResponse,
    GetAllLessonsResponse,
} from './LessonsService.types';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {ServiceRequest} from '../../Api.types';

export class LessonsService extends Api {

    private readonly serviceUrl = 'lessons/';

    @serviceMethodWithAuth
    async getAllLessons(params?: ServiceRequest): Promise<GetAllLessonsResponse> {
        return this.read(this.getServiceEndpoint(this.serviceUrl, ''), {
            headers: params?.headers,
        })
    }

    @serviceMethodWithAuth
    async createLesson(params?: ServiceRequest & CreateLessonPayload): Promise<CreateLessonResponse> {
        const { headers, ...restBody } = params ?? {};
        return this.create(this.getServiceEndpoint(this.serviceUrl, 'createLesson'), {
            headers,
            body: restBody,
        })
    }


}
