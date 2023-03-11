import {Api} from '../../Api';
import {
    GetAllSubjectsByGroupIdResponse,
} from './SubjectsService.types';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {ServiceRequest} from '../../Api.types';

export class SubjectsService extends Api {

    private readonly serviceUrl = 'subjects/';

    @serviceMethodWithAuth
    async getAllSubjectsByGroupId(params?: ServiceRequest & { groupId: string }): Promise<GetAllSubjectsByGroupIdResponse> {
        return this.read(this.getServiceEndpoint(this.serviceUrl, 'getAllSubjectsByGroupId', params?.groupId), {
            headers: params?.headers,
        })
    }

}
