import {Api} from '../../Api';
import {
    GetAllCoursesResponse,
} from './CoursesService.types';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {ServiceRequest} from '../../Api.types';

export class CoursesService extends Api {

    private readonly serviceUrl = 'courses/';

    @serviceMethodWithAuth
    async getAllCourses(params?: ServiceRequest): Promise<GetAllCoursesResponse> {
        return this.read(this.getServiceEndpoint(this.serviceUrl, ''), {
            headers: params?.headers,
        })
    }

}
