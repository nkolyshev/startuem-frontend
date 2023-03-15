import axios, {AxiosInstance} from 'axios';
import {ApiMethodMutableConfig, ApiMethodUnMutableConfig, ServiceRequest} from './Api.types';
import {apiMethod} from './decorators/apiMethod';

export class Api {

    private readonly baseUrl = 'http://localhost:5555/';
    private readonly baseUrl2 = 'https://startuem-backend.vercel.app/';

    constructor() {}

    @apiMethod
    protected async read<R>(url: string, config?: ServiceRequest & ApiMethodUnMutableConfig): Promise<R> {
        const urlWithQueryParams = config?.queryParams ? `${this.baseUrl}${url}` + new URLSearchParams(config?.queryParams as Record<string, string>) : `${this.baseUrl}${url}`;
        // @ts-ignore
        const response: R = await fetch(urlWithQueryParams, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.headers ?? {} as Headers)
            },
        });
        return response;
    }

    @apiMethod
    protected async create<R>(url: string, config?: ServiceRequest & ApiMethodMutableConfig): Promise<R> {
        const urlWithQueryParams = config?.queryParams ? `${this.baseUrl}${url}` + new URLSearchParams(config?.queryParams as Record<string, string>) : `${this.baseUrl}${url}`;
        // @ts-ignore
        const response: R = await fetch(urlWithQueryParams, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.headers ?? {} as Headers)
            },
            body: config?.body ? JSON.stringify(config?.body) : null,
        });
        return response;
    }


    @apiMethod
    protected async update<R>(url: string, config?: ServiceRequest & ApiMethodMutableConfig): Promise<R> {
        const urlWithQueryParams = config?.queryParams ? `${this.baseUrl}${url}` + new URLSearchParams(config?.queryParams as Record<string, string>) : `${this.baseUrl}${url}`;
        // @ts-ignore
        const response: R = await fetch(urlWithQueryParams, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.headers ?? {} as Headers)
            },
            body: config?.body ? JSON.stringify(config?.body) : null,
        });
        return response;
    }

    @apiMethod
    protected async delete<R>(url: string, config?: ServiceRequest & ApiMethodUnMutableConfig): Promise<R> {
        const urlWithQueryParams = config?.queryParams ? `${this.baseUrl}${url}` + new URLSearchParams(config?.queryParams as Record<string, string>) : `${this.baseUrl}${url}`;
        // @ts-ignore
        const response: R = await fetch(urlWithQueryParams, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.headers ?? {} as Headers)
            },
        });
        return response;
    }

    protected getServiceEndpoint(serviceUrl: string, endpointUrl: string, uriParam?: string) {
        return `${serviceUrl}${endpointUrl}${uriParam ? '/' + uriParam : ''}`;
    }

}
