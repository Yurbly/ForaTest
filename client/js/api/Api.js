import axios from 'axios';

export const REST_API_URL = '/fora/';

export const HTTP_STATUS_CODE_OK = 200;
export const HTTP_STATUS_CODE_NOT_ACCEPTABLE = 406;
export const HTTP_STATUS_CODE_UNPROCESSABLE_ENTITY = 422;
export const HTTP_STATUS_CODE_BAD_REQUEST = 400;
export const HTTP_STATUS_CODE_WARN = 203;

const instance = axios.create({
    baseURL: REST_API_URL,
    timeout: 20000,
    headers: {'X-Requested-With': 'XMLHttpRequest'},


});

export function post(url, body) {
    return instance.post(url, body);
}

export function get(url) {
    return instance.get(url);
}

export function getAll() {
    return instance.get('');
}

export function put(url, body) {
    return instance.put(url, body);
}

export function remove(url) {
    return instance.delete(url);
}