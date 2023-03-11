import {Api} from '../../Api';
import {
    GetAllGroupsByCourseIdResponse,
} from './GroupsService.types';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {ServiceRequest} from '../../Api.types';

export class GroupsService extends Api {

    private readonly serviceUrl = 'groups/';

    @serviceMethodWithAuth
    async getAllGroupsByCourseId(params?: ServiceRequest & { courseId: string }): Promise<GetAllGroupsByCourseIdResponse> {
        return this.read(this.getServiceEndpoint(this.serviceUrl, 'getAllGroupsByCourseId', params?.courseId), {
            headers: params?.headers,
        })
    }

}
