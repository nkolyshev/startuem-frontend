import {Api} from '../../Api';
import {
    AddStudentToLessonPayload,
    AddStudentToLessonResponse,
    CreateLessonPayload,
    CreateLessonResponse,
    GetAllLessonsResponse,
    GetAllLessonsWithFiltersPayload,
    GetAllLessonsWithFiltersResponse,
    RemoveStudentToLessonPayload,
    RemoveStudentToLessonResponse,
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

    @serviceMethodWithAuth
    async addStudentToLesson(params?: ServiceRequest & AddStudentToLessonPayload): Promise<AddStudentToLessonResponse> {
        const { headers, ...restBody } = params ?? {};
        return await this.update(this.getServiceEndpoint(this.serviceUrl, 'addStudentToLesson'), {
            headers,
            body: restBody,
        })
    }

    @serviceMethodWithAuth
    async removeStudentFromLesson(params?: ServiceRequest & RemoveStudentToLessonPayload): Promise<RemoveStudentToLessonResponse> {
        const { headers, ...restBody } = params ?? {};
        return await this.update(this.getServiceEndpoint(this.serviceUrl, 'removeStudentFromLesson'), {
            headers,
            body: restBody,
        })
    }

    @serviceMethodWithAuth
    async getAllLessonsWithFilters(params?: ServiceRequest & GetAllLessonsWithFiltersPayload): Promise<GetAllLessonsWithFiltersResponse> {
        const { headers, ...restBody } = params ?? {};
        return await this.create(this.getServiceEndpoint(this.serviceUrl, 'getAllLessonsWithFilters'), {
            headers,
            body: restBody,
        })
    }


}
