import {AxiosRequestHeaders, AxiosResponse} from 'axios';

export type ApiMethodConfig = ServiceRequest & {
    queryParams?: object,
    body?: object,
}

export type ApiMethodMutableConfig = ApiMethodConfig
export type ApiMethodUnMutableConfig = Omit<ApiMethodConfig, 'body'>

export type ApiMethod<Request> = <R extends Request>(url: string, config?: ApiMethodMutableConfig | ApiMethodUnMutableConfig) => Promise<R>

export type ServiceMethod = (props: ServiceRequest & any) => Promise<any>

export type ServiceRequest = {
    headers?: Headers;
};
