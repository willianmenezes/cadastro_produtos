export interface RequestResponse {

    message: string;
}

export interface RequestResponseEntity<T> extends RequestResponse{

    response: T;
}