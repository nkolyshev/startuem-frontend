import {ServiceMethod} from '../Api.types';
import {LocalStorage} from "../../localStorage/LocalStorage";

export const serviceMethodWithAuth = (
    _target: object,
    _method: string,
    descriptor: TypedPropertyDescriptor<ServiceMethod>,
): void => {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
        throw new Error('Service метод не найден!')
    }

    descriptor.value = async function (params) {

        const accessToken = LocalStorage.accessToken;

        if (!accessToken) {
            return await originalMethod.call(this, params);
        }

        const args = {
            ...(params ?? {}),
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }

        return await originalMethod!.call(this, args);
    };
};
