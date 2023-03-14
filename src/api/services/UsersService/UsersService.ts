import {Api} from '../../Api';
import {
    CheckUserUIDPayload, CheckUserUIDResponse,
    GetAllUsersByGroupIdResponse,
    GetAllUsersResponse, EditUserPayload,
} from './UsersService.types';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {ServiceRequest} from '../../Api.types';

export class UsersService extends Api {

    private readonly serviceUrl = 'users/';

    @serviceMethodWithAuth
    async getAllUsers(params?: ServiceRequest): Promise<GetAllUsersResponse> {
        return this.read(this.getServiceEndpoint(this.serviceUrl, ''), {
            headers: params?.headers,
        })
    }

    @serviceMethodWithAuth
    async checkUserUID(params?: ServiceRequest & CheckUserUIDPayload): Promise<CheckUserUIDResponse> {
        return this.read(this.getServiceEndpoint(this.serviceUrl, 'checkUserUID', params?.userUID), {
            headers: params?.headers,
        })
    }

    @serviceMethodWithAuth
    async getAllUsersByGroupId(params?: ServiceRequest & { groupId: string }): Promise<GetAllUsersByGroupIdResponse> {
        return this.read(this.getServiceEndpoint(this.serviceUrl, 'getAllUsersByGroupId', params?.groupId), {
            headers: params?.headers,
        })
    }

    @serviceMethodWithAuth
    async updateUser({ currentUserUID, headers,  ...body }: ServiceRequest & EditUserPayload & { currentUserUID: string }): Promise<void> {
        return this.update(this.getServiceEndpoint(this.serviceUrl, 'updateUser', currentUserUID), {
            headers,
            body,
        })
    }


}
