import {Api} from '../../Api';
import {
    LoginBody, LoginResponse, RefreshTokenResponse, RegisterBody, RegisterResponse,
    ValidateTokenResponse
} from './AuthService.types';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {ServiceRequest} from '../../Api.types';

export class AuthService extends Api {

    private readonly serviceUrl = 'auth/';

    async login(body: LoginBody): Promise<LoginResponse> {
        return this.create<LoginResponse>(this.getServiceEndpoint(this.serviceUrl, 'login'), {
            body: body,
        })
    }

    async register(body: RegisterBody): Promise<RegisterResponse> {
        return this.create<RegisterResponse>(this.getServiceEndpoint(this.serviceUrl, 'register'), {
            body: body,
        })
    }

    @serviceMethodWithAuth
    async validateToken(params?: ServiceRequest): Promise<ValidateTokenResponse> {
        return this.read<ValidateTokenResponse>(this.getServiceEndpoint(this.serviceUrl, 'validateToken'), {
            headers: params?.headers,
        })
    }

    async refreshToken(params?: ServiceRequest): Promise<RefreshTokenResponse> {
        return this.read<RefreshTokenResponse>(this.getServiceEndpoint(this.serviceUrl, 'refreshToken'), {
            headers: params?.headers,
        })
    }

    async logout(params?: ServiceRequest): Promise<void> {
        return this.read<void>(this.getServiceEndpoint(this.serviceUrl, 'logout'), {
            headers: params?.headers,
        })
    }

}
