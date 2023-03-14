import {Api} from '../Api';
import {ApiMethod} from '../Api.types';


export const apiMethod = (_target: Api, propertyKey: string, descriptor: TypedPropertyDescriptor<ApiMethod<any>>) => {

    const originalMethod = descriptor.value;

    if (!originalMethod) {
        throw new Error('API метод не найден!')
    }

    descriptor.value = async function (...props){
        const response = await originalMethod.apply(this, props) as Response;
        if (response!.status > 299) {
            throw new Error(response!.statusText);
        }
        return await response.body ? response.json() : null;
    }

}
